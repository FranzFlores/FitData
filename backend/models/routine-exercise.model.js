'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var routineExerciseSchema = new Schema({
    idRoutine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Routine"
    },
    idExercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    },
    sets: { type: Number, require: true },
    repetions: { type: Number, require: true },
    weight: { type: Number, require: true },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Routine-Exercise", routineExerciseSchema);
