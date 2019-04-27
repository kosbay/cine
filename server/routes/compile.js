const express = require('express');

const router = express.Router();

const { getCompilerList, getOutput, checkStatus, addCompile } = require("../controllers/compile");

router.get('/compile/getCompilerList', getCompilerList);
router.post('/getOutput', getOutput);
router.post('/checkStatus', checkStatus);
router.post('/compile', addCompile)

module.exports = router;
