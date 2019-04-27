const mongoose = require('mongoose');
const passport = require('passport');

const validateApplyInput = require('../validation/apply');
const Quest = require('../models/Quest');

module.exports.getQuests = async (req, res) => {
  let quests = await Quest.find({});
  if(!quests) return res.status(404).json({ errors: 'Нет вопросов' });
  res.json(quests);
}

module.exports.addQuest = async (req, res) => {
  const newQuest = {
    user: req.user.id,
    quest: req.body.quest
  }
  let quest = new Quest(newQuest);
  quest = await quest.save();
  res.json(quest);
}

module.exports.addAns = async (req, res) => {
  let quest = Quest.findOneById(req.body._id);
  quest.ans = req.body.ans;
  quest = await quest.save();
  res.json(quest);
}
