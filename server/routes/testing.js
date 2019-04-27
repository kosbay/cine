const express = require('express');

const router = express.Router();

const {
  requireAdmin
} = require("../helpers/group");

const { pointAdding, removeUsernameSpaces, refreshWupai, deleteAdminProgress, changePasswordStatus, deletingTrees, contentRefresher, updateFacultyLessons, schoolUser, usernameToLower, createObjectTest, courseCount, getChapterWithProgress } = require("../controllers/testing");

router.get('/pointAdd', requireAdmin, pointAdding);
router.get('/removeUsernameSpaces', requireAdmin, removeUsernameSpaces);
router.get('/refresherWupai', requireAdmin, refreshWupai);
router.post('/deleteAdminProgress', requireAdmin, deleteAdminProgress);
router.post('/changeProgressStatus', requireAdmin, changePasswordStatus);
router.get('/deletingTree', requireAdmin, deletingTrees);
router.get('/contentRefresher', requireAdmin, contentRefresher);
router.get('/updateFacultyLessons', requireAdmin, updateFacultyLessons);
router.get('/schoolUser', schoolUser);
router.get('/usernameToLower', requireAdmin, usernameToLower);
router.get('/createObjectTest', requireAdmin, createObjectTest);
router.get('/courseCount', requireAdmin, courseCount);
router.get('/newProgress', getChapterWithProgress);

module.exports = router;
