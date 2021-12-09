"use strict";

const mongoose = require("mongoose"),
  Member = require("./models/member");

mongoose.connect(
  "mongodb://localhost:27017/kalakerho_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
mongoose.connection;

var contacts = [
  {
    name: { first: "Niklas", last: "Blomqvist" },
    email: "niklas.blomqvist@edu.turkuamk.fi",
    zipCode: 20360
  },
  {
    name: { first: "Minna", last: "Rautiainen" },
    email: "minna.rautiainen@edu.turkuamk.fi",
    zipCode: 20331
  },
  {
    name: { first: "Roni", last: "Kurjenrauma" },
    email: "roni.kurjenrauma@edu.turkuamk.fi",
    zipCode: 20540
  },
  {
    name: { first: "Katri", last: "Lindell" },
    email: "katri.lindell@edu.turkuamk.fi",
    zipCode: 20740
  }];

Member.deleteMany()
  .exec()
  .then(() => {
    console.log("Member data is empty!");
  });

var commands = [];

contacts.forEach(c => {
  commands.push(
    User.create({
      name: c.name,
      email: c.email,
      zipCode: c.zipCode
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });
