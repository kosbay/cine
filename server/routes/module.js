const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");
const { validate } = require("../validations/module");

const { getModule, getModules, addModule, addModulesLesson, updateModule, updateModulesLesson, deleteModule, deleteModulesLesson, removeModulesWupais } = require("../controllers/module")

router.get('/removeModulesWupais', requireAdmin, removeModulesWupais);
router.get('/modules', getModules);
router.get('/modules/:moduleId', getModule);

router.post('/modules', validate(), requireAdmin, addModule);
router.post('/modules/:moduleId', requireAdmin, updateModule);
router.post('/modules/:moduleId/lessons', requireAdmin, addModulesLesson);
router.post('/modules/:moduleId/lessons/:lessonId', requireAdmin, updateModulesLesson);

router.delete('/modules/:moduleId/lessons/:lessonId', requireAdmin, deleteModulesLesson);
router.delete('/modules/:moduleId', requireAdmin, deleteModule);

module.exports = router;
