const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");
const { validate } = require("../validations/faculty");

const { getFaculties, getFaculty, getFacultiesBySchool, addFaculty, updateFaculty, deleteFaculty } = require("../controllers/faculty");

router.get('/faculties', getFaculties);
router.get('/facultiesBySchool', getFacultiesBySchool);
router.post('/faculties', validate(), requireAdmin, addFaculty);
router.get('/faculties/:facultyId', getFaculty);
router.post('/faculties/:facultyId', requireAdmin, updateFaculty);
router.delete('/faculties/:facultyId', requireAdmin, deleteFaculty)

module.exports = router;
