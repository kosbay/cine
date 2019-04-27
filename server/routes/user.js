const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");

const { validate } = require("../validations/user");

const { getUsers, addUser, demoUserRegistration, getUser, getUserRank, updateUser, deleteUser, setUserPassword, setUserBadge  } = require("../controllers/user");

router.get('/users', getUsers);
router.post('/users', validate(), requireAdmin, addUser);
router.post('/demoRegistration', demoUserRegistration);
router.get('/users/:userId', requireAdmin, getUser);
router.get('/users/rank/:userId', getUserRank);
router.post('/users/:userId', requireAdmin, updateUser);
router.delete('/users/:userId', requireAdmin, deleteUser);
router.post('/users/:userId/setPassword', requireAdmin, setUserPassword);
router.post('/badge/social_achievements', setUserBadge);

module.exports = router;
