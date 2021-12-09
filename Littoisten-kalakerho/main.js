"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  membersController = require("./controllers/membersController"),
  kalakerhoController = require("./controllers/kalakerhoController")
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/kalakerho_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false
  })
);

router.use(express.json());
router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);
router.get("/records", homeController.records);

router.get("/members", membersController.index, membersController.indexView);
router.get("/members/new", membersController.new);
router.post("/members/create", membersController.create, membersController.redirectView);
router.get("/members/:id", membersController.show, membersController.showView);

router.get("/kalakerho", kalakerhoController.index, kalakerhoController.indexView);
router.get("/kalakerho/new", kalakerhoController.new);
router.post("/kalakerho/create", kalakerhoController.create, kalakerhoController.redirectView);
router.get("/kalakerho/:id", kalakerhoController.show, kalakerhoController.showView);


router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);
app.use('/favicon.ico', express.static('images/favicon.ico'));

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
