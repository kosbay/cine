import Payment, {
  CloudPaymentResponseParseUtils,
  checkCloudPaymentErrors
} from '../services/Cloudpayment';

const mongoose = require("mongoose");

const User = mongoose.model("User");
const Tariff = mongoose.model("Tariff");
const UserCards = mongoose.model("UserCards");
const UserSubscriptions = mongoose.model("UserSubscriptions");
const { to } = require("../helpers/promise");
const {
  requireUser,
} = require("../helpers/group");


const bindCard = async (req, res) => {
  try {
    const { cardName, packet, email } = req.body;
    const userId = req.user._id;
    const defineIp = ip => {
      if (ip.includes("::ffff:")) {
        return ip.split("::ffff:")[1];
      }
      return ip;
    }

    const ipClient = await defineIp(req.ip);
    const firstPaymentSave = {
      Amount: 1,
      Currency:"KZT",
      Description:"Binding User Card",
      AccountId: userId,
      Name: cardName,
      CardCryptogramPacket: packet,
      Email: email,
      IpAddress: ipClient
    }

    const { data } = await Payment.firstPayment(firstPaymentSave);
    await checkCloudPaymentErrors({ res, data });
    // if (cloudPaymentErrors) console.log("cloudPaymentErrors", cloudPaymentErrors);
    /* response if 3d secure needed */
    if (CloudPaymentResponseParseUtils.is3dSecure(data)) {
      return res.status(200).json({
        "secureCallback": {
          ...CloudPaymentResponseParseUtils.get3dSecureLinkWithParams(data),
          callbackUrl:
            "http://localhost:5001/api/cloudpayment/3dSecureCallback"
        }
      });
    }

    if (!CloudPaymentResponseParseUtils.isSubscriptionCreateSuccess(data))
      throw new Error(data.Message);

    const { CardFirstSix, CardType, Token, CardLastFour, Email, Issuer, TransactionId, Amount, Name } = data.Model;
    await UserCards.deleteMany({ userId });
    await UserCards.create({
      cardFirstSix: CardFirstSix,
      cardType: CardType,
      name: Name,
      token: Token,
      cardLastFour: CardLastFour,
      userEmail: Email,
      issuer: Issuer,
      userId
    });
    await Payment.refund({ TransactionId, Amount });
    return res.status(200).send("Вы успешно добавили карту!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error!")
  }
};

const secureCallback = async (req, res) => {
  try {
    const { MD, PaRes } = req.body;
    const { data } = await Payment.confirm3dSecure({
      TransactionId: MD,
      PaRes
    });
    
    const cloudPaymentErrors = await checkCloudPaymentErrors({ res, data });
    if (cloudPaymentErrors) {
      return res.status(400).send("Error with Payment");
    }
    
    // refund 1 tenge
    await Payment.refund({ TransactionId: MD, Amount: 1 });

    const { CardFirstSix, CardType, Token, CardLastFour, Email, Issuer, Name, AccountId } = data.Model;

    await UserCards.deleteMany({ userId: AccountId });

    await UserCards.create({
      cardFirstSix: CardFirstSix,
      cardType: CardType,
      name: Name,
      token: Token,
      cardLastFour: CardLastFour,
      userEmail: Email,
      issuer: Issuer,
      userId: AccountId
    })
    
    return res.status(200).redirect("http://localhost:3001/subscription");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error!")
  }
};

const saveSubscription = async (req, res) => {
  const { tariffId, facultyId } = req.body;
  const userId = req.user._id;
  const tariff = await Tariff.findById(tariffId);
  const userCard = await UserCards.findOne({ userId });
  if(!userCard || Object.keys(userCard).length === 0){
    return res.status(200).send(`У вас нет карт! Пожалуйста добавьте карту!`)
  }
  const subscriptionParams = {
    Token: userCard.token,
    AccountId: userId,
    Description: tariff.description,
    Email: userCard.userEmail,
    Amount: tariff.price,
    Currency: "KZT",
    RequireConfirmation: true,
    StartDate: new Date(),
    Interval: tariff.interval,
    Period: 1
  }

  const { data } = await Payment.subscriptionSave(subscriptionParams);

  if (!CloudPaymentResponseParseUtils.isSubscriptionCreateSuccess(data)){
    return res.status(400).send({ err: data.Message })
  }
  
  const { StartDateIso, Id } = data.Model;

  const saveSubscriptionParams = {
    subscriptionId: Id,
    type: "online",
    startDate: StartDateIso,
    active: true,
    userId,
    tariffId: tariff._id,
    userCardId: userCard._id
  }

  await UserSubscriptions.create(saveSubscriptionParams);

  await User.update(
    { _id: userId },
    {
      $push: {
        faculties: facultyId
      },
      role: tariff.type
    }
  );

  return res.status(200).send(`Вы успешно подписаны на тариф ${tariff.name} и на факультет!`)
}

module.exports = (app) => {
  app.post("/api/cloudpayment/firstPayment", requireUser, async (req, res) => {
    try{
      await bindCard(req, res);
    } catch(err){
      res.status(500).send({ err })
    }
  })

  app.post("/api/cloudpayment/3dSecureCallback", async (req, res) => {
    try{
      await secureCallback(req, res);
    } catch(err){
      console.log(err);
      res.status(500).send({ err })
    }
  });

  app.post("/api/cloudpayment/saveSubscription", requireUser, async (req, res) => {
    try {
      const { tariffId, facultyId } = req.body;
      const userId = req.user._id;
      const tariff = await Tariff.findById(tariffId);
      const userCards = await UserCards.findOne({ userId });

      if(!tariffId || !facultyId){
        return res.status(200).send("Выберите тариф и факультет!");
      }

      if(userCards && userCards.length === 0){
        return res.status(200).send("Карта не найдена!");
      }
      
      const userSubscription = await UserSubscriptions.find({ tariffId, userId });
      if(userSubscription && userSubscription.length > 0){
        return res.status(200).send(`Вы уже подписаны на тариф ${tariff.name}`)
      }
      const userFaculty = await User.find({ _id: userId, faculties: { $in: [facultyId] } });
      if(userFaculty && userFaculty.length > 0){
        return res.status(200).send(`Вы уже подписаны на этот факультет!`)
      }
      return await saveSubscription(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ err })
    }
  });

  app.get("/api/cloudpayment/userCard", requireUser, async (req, res) => {
    try{
      const userId = req.user._id;
      const [err, userCards] = await to(UserCards.findOne({ userId }).select({ token: 0 }));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(userCards);
    } catch(err){
      console.log(err);
      res.status(500).send({ err })
    }
  });

  app.get("/api/cloudpayment/userSubscription", requireUser, async (req, res) => {
    try{
      const userId = req.user._id;
      const [err, userSubscription] = await to(UserSubscriptions.find({ userId }).populate("tariffId"));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(userSubscription);
    } catch(err){
      console.log(err);
      res.status(500).send({ err })
    }
  });

  app.get("/api/cloudpayment/subscriptionStatus", async (req, res) => {
    try{
      const { data } = await Payment.subscriptionStatus({ Id: "sc_3c5a81ca776f57076bc05bc11e7d4" });
      res.status(200).send(data);
    } catch(err){
      console.log(err);
      res.status(500).send({ err })
    }
  })

  app.post("/api/cloudpayment/subscriptionCancel", requireUser, async (req, res) => {
    try{
      const userId = req.user._id;
      const [err, userSubscription] = await to(UserSubscriptions.findOne({ userId }));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      const { data } = await Payment.subscriptionCancel({ Id: userSubscription.subscriptionId });
      if(data.Success) await UserSubscriptions.update(
        { userId },
        {
          active: false
        }
      );
      res.status(200).send(data);
    } catch(err){
      console.log(err);
      res.status(500).send({ err })
    }
  });

  app.post("/api/cloudpayment/statusWebhook", async ({ body }, res) => {
    try{
      console.log("FROM WEBHOOL", body)
      res.status(200).send("OK")
    } catch(err){
      console.log(err);
      res.status(500).send({ err });
    }
  });

  app.post("/api/cloudpayment/payWebhook", async ({ body }, res) => {
    try{
      console.log("payWebhook ", body)
      res.status(200).send("OK")
    } catch(err){
      console.log(err);
      res.status(500).send({ err });
    }
  })

  app.post("/api/cloudpayment/failWebhook", async ({ body }, res) => {
    try{
      console.log("failWebhook ", body)
      res.status(200).send("OK")
    } catch(err){
      console.log(err);
      res.status(500).send({ err });
    }
  })
  app.post("/api/cloudpayment/recurrentWebhook", async ({ body }, res) => {
    try{
      console.log("recurrentWebhook ", body)
      res.status(200).send("OK")
    } catch(err){
      console.log(err);
      res.status(500).send({ err });
    }
  })

  app.get("/api/cloudpayment/test", async ({ body }, res) => {
    try{
      console.log("recurrentWebhook ", body)
      res.status(200).send("OK")
    } catch(err){
      console.log(err);
      res.status(500).send({ err });
    }
  })

}
