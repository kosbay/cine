const mongoose = require("mongoose");

const Certificate = mongoose.model("Certificate");

const { to } = require("../helpers/promise");


module.exports.getCertificates = async (req, res) => {
  try {
    const [err, certificates] = await to(Certificate.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(certificates);
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
}

module.exports.getCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    if (certificateId === "false") {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, certificate] = await to(Certificate.findById(certificateId));
      if (err) {
        res.status(500).send({ err });
      }
      res.status(200).send(certificate);
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports.addCertificate = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const certificate = await new Certificate(req.body);
      await certificate.save();
      res.status(200).send(certificate);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.updateCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    if (!certificateId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Certificate.update({ _id: certificateId }, req.body);
      const [err, certificate] = await to(Certificate.findById(certificateId));
      if (err) {
        res.status(500).send({ err });
      }
      res.status(200).send(certificate);
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports.deleteCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    if (!certificateId) return res.status(400).send({ err: "Данные не отправлены!" });
    const [err, result] = await to(
      Certificate.findByIdAndRemove(certificateId)
    );
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}
