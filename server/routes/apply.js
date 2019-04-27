const express = require('express')
const router = express.Router()
const passport = require('passport')
const multer = require('multer')
const mime = require('mime')

const {
  apply,
  approved,
  refuse,
  addDocs,
  getAppliesByUniver,
  getAppliesByUser,
  deleteApply
} = require('../controllers/apply');

router.get('/:univer_id', passport.authenticate('jwt', { session: false }), getAppliesByUniver)
router.get('/', passport.authenticate('jwt', { session: false }), getAppliesByUser)
router.post('/', passport.authenticate('jwt', { session: false }), apply)
router.put('/:id', passport.authenticate('jwt', { session: false }), refuse)
router.put('/app/:id', passport.authenticate('jwt', { session: false }), approved)
router.put('/add_docs/:id', passport.authenticate('jwt', { session: false }), addDocs)
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteApply)

module.exports = router
