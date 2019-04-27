const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");
const { validate } = require("../validations/chapter");

const { getChapters, getChapter, addChapter, updateChapter, deleteChapter } = require("../controllers/chapter")

router.get('/chapters', getChapters);
router.post('/chapters', validate(), requireAdmin, addChapter);
router.get('/chapters/:chapterId', getChapter);
router.post('/chapters/:chapterId', requireAdmin, updateChapter)
router.delete('/chapters/:chapterId', requireAdmin, deleteChapter)

module.exports = router;
