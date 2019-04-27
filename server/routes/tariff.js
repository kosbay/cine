const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");

const { getTariffs, addTariff, getTariff, updateTariff, deleteTariff } = require("../controllers/tariff");

router.get('/tariffs', getTariffs);
router.post('/tariff', requireAdmin, addTariff);
router.get('/tariff/:tariffId', getTariff);
router.put('/tariff/:tariffId', requireAdmin, updateTariff);
router.delete('/tariff/:tariffId', requireAdmin, deleteTariff)

module.exports = router;
