const express = require('express');

const router = express.Router();

const { requireAdmin } = require("../helpers/group");

const { getCertificates, getCertificate, addCertificate, updateCertificate, deleteCertificate } = require("../controllers/certificate")

router.get('/certificates/', requireAdmin, getCertificates);
router.get('/certificates/:certificateId', requireAdmin, getCertificate);
router.post('/certificates', requireAdmin, addCertificate);
router.put('/certificates/:certificateId', requireAdmin, updateCertificate);
router.delete('/certificates/:certificateId', requireAdmin, deleteCertificate)

module.exports = router;
