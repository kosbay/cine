const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  getReviews,
  addReview,
  count
} = require('../controllers/review.controllers');

router.get('/:id', passport.authenticate('jwt', { session: false }), getReviews);
router.get('/count/:id', count);
router.post('/', passport.authenticate('jwt', { session: false }), addReview);

module.exports = router;
