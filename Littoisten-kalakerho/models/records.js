"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  recordSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      species: {
        type: String,
        required: true
      },
      weight: {
        type: Number,
      },
      length: {
        type: Number,
      }
    });


module.exports = mongoose.model("Record", recordSchema);