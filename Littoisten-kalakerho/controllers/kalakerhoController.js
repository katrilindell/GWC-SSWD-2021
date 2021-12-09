"use strict";

const kalakerho = require("../models/kalakerho");

module.exports = {
  index: (req, res, next) => {
    kalakerho.find({})
      .then(kalakerho => {
        res.locals.kalakerho = kalakerho;
        next();
      })
      .catch(error => {
        console.log(`Error fetching kalakerho: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("kalakerho/index");
  },
  new: (req, res) => {
    res.render("kalakerho/new");
  },

  create: (req, res, next) => {
    let kalakerhoParams = {
      title: req.body.title,
      description: req.body.description,
      items: [req.body.items.split(",")],
      zipCode: req.body.zipCode
    };
    kalakerho.create(kalakerhoParams)
      .then(kalakerho => {
        res.locals.redirect = "/kalakerho";
        res.locals.kalakerho = kalakerho;
        next();
      })
      .catch(error => {
        console.log(`Error saving kalakerho: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => {
    let kalakerhoId = req.params.id;
    kalakerho.findById(kalakerhoId)
      .then(kalakerho => {
        res.locals.kalakerho = kalakerho;
        next();
      })
      .catch(error => {
        console.log(`Error fetching kalakerho by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("kalakerho/show");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  }
};
