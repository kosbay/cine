const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");
const { validate } = require("../validations/school");

const { getSchool, getSchoolInfo, getSchoolList, getSchools, addSchool, updateSchool, deleteSchool } = require("../controllers/school");


router.get('/schools', getSchools);
router.get('/schoolsList', getSchoolList);
router.get('/schoolInfo', getSchoolInfo);
router.post('/schools', validate(), requireAdmin, addSchool);
router.get('/schools/:schoolId', getSchool);
router.post('/schools/:schoolId', requireAdmin, updateSchool);
router.delete('/schools/:schoolId', requireAdmin, deleteSchool);

module.exports = router;
