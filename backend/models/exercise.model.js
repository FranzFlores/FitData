'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var exerciseSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    url: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Exercise", exerciseSchema);
