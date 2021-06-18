'use strict'

const mongoose = require('mongoose');
const URI = "mongodb://localhost/FitData";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(db => console.log('Data Base Connect!!'))
    .catch(err => console.log(err));

module.exports = mongoose;
