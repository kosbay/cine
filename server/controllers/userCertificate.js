const mongoose = require("mongoose");

const UserCertificate = mongoose.model("UserCertificate");

const { to } = require("../helpers/promise");

module.exports.getUserCertificates = async (req, res) => {
  try {
    const [err, userCertificate] = await to(UserCertificate.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(userCertificate);
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
}

module.exports.getPopulatedUserCertificates = async (req, res) => {
  try {
    const { userId } = req.params;
    const [err, userCertificate] = await to(UserCertificate.find({ user: userId })
      .populate('certificate').lean());
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(userCertificate);
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
}

module.exports.getByCertificateId = async (req, res) => {
  try {
    const { userCertificateId } = req.params;
    if (userCertificateId === "false") {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, userCertificate] = await to(UserCertificate.findById(userCertificateId));
      if (err) {
        res.status(500).send({ err });
      }
      res.status(200).send(userCertificate);
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports.addUserCertificate = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } 
    
    const oldUserCertificated = await UserCertificate.findOne(req.body);
    if (oldUserCertificated) {
      res.status(200).send(oldUserCertificated);
    }

    const userCertificate = await new UserCertificate(req.body);
    await userCertificate.save();
    res.status(200).send(userCertificate);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteUserCertificate = async (req, res) => {
  try {
    const { userCertificateId } = req.params;
    if (!userCertificateId) res.status(400).send({ err: "Данные не отправлены!" });
    const [err, result] = await to(
      UserCertificate.findByIdAndRemove(userCertificateId)
    );
    if (err) {
      res.status(500).send({ err });
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ err });
  }
}
