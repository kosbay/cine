const express = require("express");
const bodyParser = require("body-parser");

module.exports = function(app) {
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.json({ limit: "50mb", extended: true }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 1000000
    })
  );
  app.use("/api/auth", require("../routes/auth.js"));
  app.use("/api/univer", require("../routes/university.js"));
  app.use("/api/facul", require("../routes/facultet.js"));
  app.use("/api/apply", require("../routes/apply.js"));
  app.use("/api/reset", require("../routes/resetPassword"));
  app.use("/api/quest", require("../routes/question"));
  app.use("/api/review", require("../routes/review"));
  app.use("/api/student", require("../routes/student"));
  app.use("/api/payment", require("../routes/payment"));
};
