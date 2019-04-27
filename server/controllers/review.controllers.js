const mongoose = require('mongoose');
const passport = require('passport');

const validateApplyInput = require('../validation/apply');
const Review = require('../models/Review');
const Univer = require('../models/University');
const validateRevInput = require('../validation/review')

module.exports.getReviews = async (req, res) => {
  let reviews = await Review.find({ univer: req.params.id });
  if(!reviews) return res.status(404).json({ errors: 'Нет вопросов' });
  res.json(reviews);
}

module.exports.addReview = async (req, res) => {

  const { errors, isValid } = validateRevInput(req.body.data);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const newReview = {
    user: req.user.id,
    univer: req.body.id,
    review: req.body.data.review,
    rating: req.body.data.rating
  }

  let existsReview = await Review.findOne({ user: req.user.id });
  if(existsReview) return res.status(400).json({ error: 'Вы уже поставили оценку' })

  let review = new Review(newReview);
  review = await review.save();

  let univer = await Univer.findOne({ _id: req.body.id });
  univer.revs.push(review.rating);
  univer = await univer.save();

  res.json(review);
}

module.exports.count = async (req, res) => {
  let count = await Review.count({ univer: req.params.id });
  if(!count) return res.status(404).json(0);
  res.json(count);
}
