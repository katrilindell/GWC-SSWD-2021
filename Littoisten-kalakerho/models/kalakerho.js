"use strict";

const mongoose = require("mongoose");

const kalakerhoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  items: [],
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  }
});

module.exports = mongoose.model("kalakerho", kalakerhoSchema);
