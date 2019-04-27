const express = require('express');

const router = express.Router();

const { requireUser } = require("../helpers/group");

const { getUserCertificates, getPopulatedUserCertificates, getByCertificateId, addUserCertificate, deleteUserCertificate } = require("../controllers/userCertificate");

router.get('/userCertificate/', requireUser, getUserCertificates);
router.get('/userCertificate/:userId', requireUser, getPopulatedUserCertificates);
router.get('/userCertificates/:userCertificateId', requireUser, getByCertificateId);
router.post('/userCertificate', requireUser, addUserCertificate);
router.delete('/userCertificate/:userCertificateId', requireUser, deleteUserCertificate)

module.exports = router;
