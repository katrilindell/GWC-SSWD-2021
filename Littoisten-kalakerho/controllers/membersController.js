"use strict";

const Member = require("../models/members");

module.exports = {
  index: (req, res, next) => {
    Member.find()
      .then(members => {
        res.locals.members = members;
        next();
      })
      .catch(error => {
        console.log(`Error fetching members: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("members/index");
  },
  new: (req, res) => {
    res.render("members/new");
  },
  create: (req, res, next) => {
    let memberParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      zipCode: req.body.zipCode
    };
    Member.create(memberParams)
      .then(member => {
        res.locals.redirect = "/members";
        res.locals.member= member;
        next();
      })
      .catch(error => {
        console.log(`Error saving member: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let memberId = req.params.id;
    Member.findById(memberId)
      .then(member => {
        res.locals.member = member;
        next();
      })
      .catch(error => {
        console.log(`Error fetching member by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("members/show");
  },
  edit: (req, res, next) => {
    let memberId = req.params.id;
    Member.findById(memberId)
      .then(member => {
        res.render("members/edit", {
          member: member
        });
      })
      .catch(error => {
        console.log(`Error fetching member by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let memberId = req.params.id,
      memberParams = {
        name: {
          first: req.body.first,
          last: req.body.last
        },
        email: req.body.email,
        zipCode: req.body.zipCode
      };
    Member.findByIdAndUpdate(memberId, {
      $set: memberParams
    })
      .then(member => {
        res.locals.redirect = `/members/${memberId}`;
        res.locals.member = member;
        next();
      })
      .catch(error => {
        console.log(`Error updating member by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let memberId = req.params.id;
    Member.findByIdAndRemove(memberId)
      .then(() => {
        res.locals.redirect = "/members";
        next();
      })
      .catch(error => {
        console.log(`Error deleting member by ID: ${error.message}`);
        next();
      });
  }
};
