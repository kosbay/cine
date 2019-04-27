const express = require("express");
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const winston = require("winston");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();

app.use(passport.initialize());

require("./config/passport")(passport);
require("./config/passportGoogle.js")(passport);

app.use(express.static("client/public/"));

app.use(cors());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/registration",
    failureRedirect: "/auth/registration"
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/"));
});

app.listen(port, () => {
  winston.info(`SERVER RUNNNING ON PORT ${port}`);
});

module.exports = app;
