'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var userSchema = new Schema({
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
    height: { type: Number, require: true },
    status: { type: Boolean, required: true, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("User", userSchema);
