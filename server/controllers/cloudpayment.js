import Payment, {
  CloudPaymentResponseParseUtils
} from '../services/Cloudpayment';

const saveSubscription = async (params) => {
  try {
    const {
      amount,
      userId,
      token,
      email,
      currency = "KZT",
      productName
    } = params;

    const subscriptionParams = {
      Token: token,
      AccountId: userId,
      Amount: amount,
      Currency: currency,
      Description: `You subscribed to: ${productName}`,
      Email: email,
      Interval: "Day",
      Period: 1,
      RequireConfirmation: false,
      StartDate: new Date().toISOString()
    };

    const { data } = await Payment.subscriptionSave(subscriptionParams);

    if (!CloudPaymentResponseParseUtils.isSubscriptionCreateSuccess(data))
      throw new Error(data.Message);

    const { StartDateIso, Period, MaxPeriods, Interval } = data.Model;

    const subscriptionSaveParams = {
      startDate: StartDateIso,
      period: Period,
      maxPeriods: MaxPeriods,
      interval: Interval,
      subscribed: true,
      isFirstPaymentSucced: true
    };

    // save to db
    return true;
  } catch (err) {
    throw err;
  }
};

export default saveSubscription;


module.exports = (app) => {
  app.post("/3dSecureCallback", () => {
    saveSubscription({
      productId: '',
      token: '',
      email: ''
    });
  });

  app.post("/saveSubscription", async (req, res) => {
    try {
      const params = {
        userId: "user id",
        email: "user email",
        amount: 123,
        currency: "KZT",
        productName: "dsads"
      };
      await saveSubscription(params);
    } catch (err) {
      throw err;
    }
  });
}
