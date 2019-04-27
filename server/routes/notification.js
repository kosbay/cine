const express = require('express');

const router = express.Router();

const { badgeWebhook, getNotificationMessages, addNotificationMessage, getNotifications, getNotification, addNotification } = require("../controllers/notification");

// TODO: solve this
// router.post('/badgeWebhook', badgeWebhook);
router.get('/api/notificationMessages', getNotificationMessages);
router.post('/api/notificationMessage', addNotificationMessage);
router.get('/api/notifications', getNotifications);
router.get('/api/notifications/:userId', getNotification);
router.post('/api/notification', addNotification)


module.exports = router;
