'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var activitySchema = new Schema({
    idExercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        require: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    date: { type: Date, required: true, default: new Date() },
    duration: { type: String },
    amount: {type: Number},
    sets: [{
        repetions: { type: Number, require: true },
        weight: { type: Number, require: true }
    }],

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Activity", activitySchema);
