const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");
const { getActiveEvent, getAllEvents, getEvent, addEvent, updateEvent, deleteEvent } = require("../controllers/event")

router.get('/activeEvent', getActiveEvent);
router.get('/events', requireAdmin, getAllEvents);
router.get('/event/:eventId', getEvent);
router.post('/event', addEvent);
router.post('/event/:eventId', requireAdmin, updateEvent);
router.delete('/event/:eventId', requireAdmin, deleteEvent)

module.exports = router;
