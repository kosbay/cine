const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");

const { getLesson, getLessons, updateLesson, addLesson, deleteLesson, moveLesson } = require("../controllers/lesson");

router.get('/lessons', getLessons);
router.get('/lessons/:lessonId', getLesson);
router.post('/lessons', requireAdmin, addLesson);
router.post('/lessons/:lessonId', updateLesson);
router.put('/lesson/:lessonId', moveLesson);
router.delete('/lessons/:lessonId', deleteLesson);

module.exports = router;
