const express = require('express');

const router = express.Router();

const passport = require("passport");

const { registrateUser, logout, login, currentUser } = require("../controllers/auth");


router.post('/auth/register', registrateUser);
router.get('/auth/logout', logout);
router.post('/auth/login', passport.authenticate("local", { session: false }), login);
router.get('/auth/current_user', passport.authenticate('jwt', { session:false }), currentUser)

module.exports = router;
