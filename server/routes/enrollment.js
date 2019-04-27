const express = require('express');

const router = express.Router();

const { requireUser } = require("../helpers/group");

const { userEnrollment, adminEnrollment, getEnrollmentStatus, userFacultyEnrollment, adminFacultyEnrollment } = require("../controllers/enrollment")

router.post('/enrollment', requireUser, userEnrollment);
router.post('/enrollment/admin', requireUser, adminEnrollment);
router.get('/enrollment/status', requireUser, getEnrollmentStatus);
router.post('/enrollment/faculties', userFacultyEnrollment);
router.post('/enrollment/faculties/admin', adminFacultyEnrollment)

module.exports = router;
