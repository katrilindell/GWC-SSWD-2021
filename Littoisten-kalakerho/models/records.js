"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  recordSchema = new Schema(
    {
      specie: {
          type: String,
          trim: true
        },
      weight: {
        type: Number,
        required: true
      },
      fisher: {
        type: String,
        required: true
      }
    });



module.exports = mongoose.model("Record", recordSchema);
