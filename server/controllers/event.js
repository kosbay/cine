const mongoose = require("mongoose");

const Event = mongoose.model("Event");
const Contest = mongoose.model("Contest")

const { to } = require("../helpers/promise");

module.exports.getActiveEvent = async (req, res) => {
  try {
    const event = await Contest.findOne({ active: true });
    res.status(200).send({ item: event });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getAllEvents = async (req, res) => {
  try {
    const [err, events] = await to(Event.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, school] = await to(Event.findById(eventId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(school);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.addEvent = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const event = await new Event(req.body);
      await event.save();
      res.status(200).send(event);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Event.update({ _id: eventId }, req.body);
      const [err, event] = await to(Event.findById(eventId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(event);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, result] = await to(Event.findByIdAndRemove(eventId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}
