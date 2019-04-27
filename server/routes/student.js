const express = require('express');
const router = express.Router();
const passport = require('passport');

const { getStudent, addStudent } = require('../controllers/student.controllers');

router.get('/', passport.authenticate('jwt', { session: false }), getStudent);
router.post('/', passport.authenticate('jwt', { session: false }), addStudent);

module.exports = router;
