const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");

const { validate } = require("../validations/contest");
const { getContests, addContest, updateContest, deleteContest } = require("../controllers/contest");

router.get('/contests', getContests);
router.post('/contest', validate(), addContest);
router.post('/contest/:contestId', requireAdmin, updateContest);
router.delete('/contest/:contestId', requireAdmin, deleteContest);

module.exports = router;
