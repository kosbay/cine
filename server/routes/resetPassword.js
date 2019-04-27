const router = require('express').Router()
const forgotPassword = require('../controllers/resetPassword')

router.post('/sendToken', forgotPassword.sendToken)
router.post('/', forgotPassword.resetPassword)

module.exports = router
