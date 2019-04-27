const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");

const { getSkills, getSkill, addSkill, updateSkill, deleteSkill, getUserSkill } = require("../controllers/skill")


router.get('/skills', getSkills);
router.get('/skills/:skillId', getSkill);
router.get('/userSkills/:userId', getUserSkill);
router.post('/skills', requireAdmin, addSkill);
router.post('/skills/:skillId', requireAdmin, updateSkill);
router.delete('/skills/:skillId', requireAdmin, deleteSkill);

module.exports = router;
