const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  addFacSpecs,
  putSpec,
  topSpecs,
  getFacsByUniver,
  getSpecsByUniver,
  getSpecsByFac,
  deleteSpec,
  deleteFac
} = require('../controllers/facultet.controllers');

router.get('/top', topSpecs)
router.get('/fac/:id', getFacsByUniver)
router.get('/spec/:id', getSpecsByUniver)
router.get('/spec_by_f/:id', getSpecsByFac)
router.post('/add_fac', passport.authenticate('jwt', { session: false }), addFacSpecs);
router.put('/put_spec/:id', passport.authenticate('jwt', { session: false }), putSpec);
router.delete('/delete_spec/:id', passport.authenticate('jwt', { session: false }), deleteSpec);
router.delete('/delete_fac/:id', passport.authenticate('jwt', { session: false }), deleteFac);

module.exports = router;
