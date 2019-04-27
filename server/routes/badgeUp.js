const express = require('express');

const router = express.Router();

const { createEvent, getAchievements, getUsersAchievements, getAchievementsBySubjectId, getMetrics, getBadgeProgress } = require("../controllers/badgeUp")

router.post('/createEvent', createEvent);
router.get('/achievements', getAchievements);
router.get('/achievementsOfUsers', getUsersAchievements);
router.get('/achievementsBySubjectId', getAchievementsBySubjectId);
router.get('/metricsBySubjectId', getMetrics);
router.get('/badgeProgress', getBadgeProgress)

module.exports = router;
