const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  addQuest,
  getQuests,
  addAns
} = require('../controllers/question');

router.get('/', passport.authenticate('jwt', { session: false }), getQuests);
router.post('/', passport.authenticate('jwt', { session: false }), addQuest);
router.post('/add_ans', passport.authenticate('jwt', { session: false }), addAns);

module.exports = router;
