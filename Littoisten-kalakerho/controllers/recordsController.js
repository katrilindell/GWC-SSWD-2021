"use strict";

const Record = require("../models/records");

module.exports = {
  index: (req, res, next) => {
    Record.find()
      .then(records => {
        res.locals.records = records;
        next();
      })
      .catch(error => {
        console.log(`Error fetching records: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("records/index");
  },
  new: (req, res) => {
    res.render("records/new");
  },
  create: (req, res, next) => {
    let recordParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      species: req.body.species,
      weigth: req.body.weigth,
      length: req.body.length
    };
    Record.create(recordParams)
      .then(record => {
        res.locals.redirect = "/records";
        res.locals.record= record;
        next();
      })
      .catch(error => {
        console.log(`Error saving record: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let recordId = req.params.id;
    Record.findById(recordId)
      .then(record => {
        res.locals.record = record;
        next();
      })
      .catch(error => {
        console.log(`Error fetching record by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("record/show");
  }
};