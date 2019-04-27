const express = require('express');

const router = express.Router();

const { getImages } = require("../controllers/cdnRoutes");

router.get('/getImages', getImages)

module.exports = router;
