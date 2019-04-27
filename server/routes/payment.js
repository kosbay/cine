const express = require('express')
const router = express.Router()

const { pay, finish } = require('../controllers/payment')

router.post('/pay', pay)
router.post('/finish', finish)

module.exports = router
