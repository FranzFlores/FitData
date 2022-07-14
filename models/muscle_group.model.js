'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var muscleGroupSchema = new Schema({
    name: { type: String, require: true } 
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Muscle_Group", muscleGroupSchema);