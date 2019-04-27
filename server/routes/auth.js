const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const mailer = require("nodemailer")

const validateRegisterInput = require('../validation/registration')
const validateLoginInput = require('../validation/login')
const keys = require('../config/keys')

const { registration, login, current } = require('../controllers/auth.controllers')

router.post('/registration', registration)
router.post('/login', login)
router.get('/current', current)

module.exports = router
