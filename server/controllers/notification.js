const mongoose = require("mongoose");

const Notification = mongoose.model("Notification");
const User = mongoose.model("User");

const { to } = require("../helpers/promise");
const { UserNotification, NotificationMessages } = require('../services/Firebase');

module.exports.badgeWebhook = async ({ body }, res) => {
  let notificationMessage = await NotificationMessages.findByTypeAndTitle({
    title: body.achievement.name, type: "Badge"
  });
  if(!notificationMessage && !notificationMessage._id) {
    notificationMessage = await NotificationMessages.createAndGet({
      title: body.achievement.name,
      description: body.achievement.description,
      imageURL: body.achievement.meta.icon,
      date: new Date(),
      type: "Badge"
    });
  }

  await UserNotification.create({
    recieverId: body.earnedAchievement.subject,
    notificationMessageId: notificationMessage._id,
    isRead: false,
    isSend: false,
    recieverId_isSend: `${body.earnedAchievement.subject}_false`
  });

  res.status(200).send("Ok");
}

module.exports.getNotificationMessages = async (req, res) => {
  try{
    const { type = null } = req.query;
    if (!type) {
      const notificationMessages = await NotificationMessages.getAll();
      return res.status(200).send(notificationMessages);
    }

    const notificationMessages = await NotificationMessages.findByType(type);
    return res.status(200).send(notificationMessages);
  } catch(err){
    console.log(err);
    return res.status(500).send({ err });
  }
}

module.exports.addNotificationMessage = async (req, res) => {
  try{
    const { body } = req;
    if(!body) {
      return res.status(400).send({ err: "Данные не отправлены!" })
    }

    const notificationMessage = await NotificationMessages.createAndGet(req.body);
    res.status(200).send(notificationMessage);
  } catch(err){
    console.log('notificationMessage: ', err);
    res.status(500).send({ err });
  }
}

module.exports.getNotifications = async (req, res) => {
  try {
    // const notifications = await UserNotification.getAll(true);
    const [err, notifications] = await to(Notification.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    const populatedNotifications = await Promise.all(notifications.map(async notification =>
    {
      const { recieverType, _id, created_at } = notification;
      const notificationMessage = await NotificationMessages.findById(notification.notificationMessageId);
      return {
        _id,
        recieverType,
        created_at,
        notificationMessage,
      };
    }));
    res.status(200).send(populatedNotifications);
  } catch(err){
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getNotification = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await UserNotification.findByUserId(userId);
    res.status(200).send(notifications);
  } catch(err){
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.addNotification = async (req, res) => {
  try{
    const { body } = req;
    const { recieverType } = req.query;
    let recievers = [];
    switch(recieverType){
      case "user":
        recievers = await User.find({ role: "user" }).select({ _id: 1 }).lean();
        break;
      case "teacher":
        recievers = await User.find({ role: "teacher" }).select({ _id: 1 }).lean();
        break;
      case "admin":
        recievers = await User.find({ role: "admin" }).select({ _id: 1 }).lean();
        break;
      case "reviewer":
        recievers = await User.find({ role: "reviewer" }).select({ _id: 1 }).lean();
        break;
      default:
        recievers = [];
    }

    const Notifications = await UserNotification.createAndGetAll({...body, recievers});
    console.log("Notifications", Notifications)
    await Notification.create({
      recieverType,
      notificationMessageId: body.notificationMessageId
    });
    res.status(200).send(Notifications);
  } catch(err){
    console.log(err);
    res.status(500).send({ err })
  }
}

  // app.put("/api/editNotification:notificationId", async (req, res) => {
  //   try{
  //     const { notificationId } = req.params;
  //     const { body } = req;
  //     if (!notificationId || !body) {
  //       res.status(400).send({ err: "Данные не отправлены!" });
  //     } else {
  //       await Notification.update(
  //         { _id: notificationId },
  //         {
  //           body
  //         },
  //         { multi: true }
  //       );
  //     }
  //   } catch(err){
  //     console.log(err);
  //     res.status(500).send({ err });
  //   }
  // })

  // app.put("/api/notification", async (req, res) => {
  //   try {
  //     const { notificationId } = req.query;
  //     const { body } = req;
  //     await Notification.update(
  //       { _id: notificationId },
  //       {
  //         ...body
  //       },
  //       { multi: true }
  //     );
  //     res.status(200).send("Notification modified");
  //   } catch (err) {
  //     res.status(422).send(err);
  //   }
  // });
