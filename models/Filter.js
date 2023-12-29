const mongoose = require("mongoose")
const fs = require('fs')
const filterSchema = new mongoose.Schema({
    id: String,
    name: String,
    options: [
      {
        value: String,
        label: String,
        checked: Boolean,
      },
    ],
  });

  // Create a model based on the filter schema
const Filter =  mongoose.model('Filter', filterSchema);


module.exports = Filter
