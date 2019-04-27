const mongoose = require("mongoose");

const Tariff = mongoose.model("Tariff");

const { to } = require("../helpers/promise");

module.exports.getTariffs = async (req, res) => {
  try {
    const [err, tariffs] = await to(Tariff.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(tariffs);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.addTariff = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const tariff = new Tariff(req.body);
      await tariff.save();
      res.status(200).send(tariff);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.getTariff = async (req, res) => {
  try {
    const { tariffId } = req.params;
    if (!tariffId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const tariff = await Tariff.findById(tariffId);
      res.status(200).send(tariff);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.updateTariff = async (req, res) => {
  try {
    const { tariffId } = req.params;
    if (!tariffId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Tariff.update({ _id: tariffId }, req.body);
      const tariff = await Tariff.findById(tariffId);
      res.status(200).send(tariff);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteTariff = async (req, res) => {
  try {
    const { tariffId } = req.params;
    if (!tariffId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, result] = await Tariff.findByIdAndRemove(tariffId);
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}
