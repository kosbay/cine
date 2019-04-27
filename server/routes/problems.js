const express = require('express');

const router = express.Router();

const { checkStatus, compileProblem } = require("../controllers/problems");

router.post('/problems/checkStatus', checkStatus);
router.post('/problems/compile', compileProblem)

module.exports = router;
