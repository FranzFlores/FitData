'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var activitySchema = new Schema({
    idExercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: { type: Date, required: true, default: new Date() },
    duration: { type: Date },
    amount: {type: Number}


}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Activity", activitySchema);
