'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var exerciseSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    multimedia: { type: String },
    url: { type: String },
    muscle_group: { type: String},
    status: { type: Boolean, required: true, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Exercise", exerciseSchema);
