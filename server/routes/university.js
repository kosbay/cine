const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  univer,
  getUniver,
  univers,
  universTop,
  addLogo,
  addWall,
  univerProfile,
  count,
  editDesc
} = require('../controllers/university');

router.get('/', passport.authenticate('jwt', { session: false }), univer);
router.get('/all', univers);
router.get('/top', universTop);
router.get('/one/:_id', getUniver);
router.get('/count', count);
router.put('/edit_desc', passport.authenticate('jwt', { session: false }), editDesc);
router.post('/profile', passport.authenticate('jwt', { session: false }), univerProfile);
router.put('/add_logo', passport.authenticate('jwt', { session: false }), addLogo);
router.put('/add_wall', passport.authenticate('jwt', { session: false }), addWall);

module.exports = router;
