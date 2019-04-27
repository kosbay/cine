const mongoose = require("mongoose");

const { Schema } = mongoose;

const Tariff = new Schema({
  type: { 
    type: String,
    enum: ["digital", "individual", "group"]
  },
  price: Number,
  interval: { 
    type: String,
    default: "month"
  },
  description: String,
  name: String,
  imageURL: String,
  features: Array
});

module.exports = mongoose.model("Tariff", Tariff);
