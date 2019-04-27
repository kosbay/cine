import '@babel/polyfill';
// Write only in es15
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");
const express = require("express");
const path = require("path");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const passport = require("passport");
const secure = require("express-force-https");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const corsOptions = require("./helpers/corsOptions");

const PORT = process.env.PORT || 5001;


// function start() {
  const app = express();
  // database models
  require("./models");

  const mongoUrl = config.getMongoEndpoint();
  // const mongoUrl = config.mongoDB.prodEndpoint;
  mongoose.connect(mongoUrl);
  // Firebase Init
  require("./helpers/firebaseInit");
  /* Android Layout */
  require("./services/AndroidLayout")(app);

  app.use(cors(corsOptions));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(expressValidator());
  app.use(
    session({
      secret: "sdfkjasklfdhakjlsfhksad",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      cookie: { secure: false }
    })
  );
  app.use(secure);

  require("./config/passport")(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  require("./routes")(app);
  require("./routes/progress")(app);
  require("./routes/cloudpayment")(app);

  /** ********************* Configure static files ********************** */
  console.log("STAGING: ", config.isStageMode);
  console.log("PROD: ", config.isProd);
  if (config.isStageMode || config.isDevMode) {
    app.use((req, res, next) => {
      next();
    });
  }

  /* Admin */
  if (config.isProd || config.isStageMode) {
    const adminPath = path.join(__dirname, "..", "admin", "build");
    const adminPathIndexFile = path.join(
      __dirname,
      "..",
      "admin",
      "build",
      "index.html"
    );
    app.use("/public/", express.static(adminPath));
    app.get("/login", (_, res) => res.sendFile(adminPathIndexFile));
    app.get("/register", (_, res) => res.sendFile(adminPathIndexFile));
    app.get("/", (_, res) => res.sendFile(adminPathIndexFile));
    app.get("/*", (_, res) => res.sendFile(adminPathIndexFile));
  }

  app.listen(PORT, () => {
    console.log(`Ready on port: ${PORT}`);
  });
// }

// throng({
//   workers: 2,
//   lifetime: Infinity
// }, start)
