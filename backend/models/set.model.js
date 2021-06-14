'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var setSchema = new Schema({
    idActivity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity"
    },
    date: { type: Date, required: true, default: new Date() },
    duration: { type: Date },
    amount: {type: Number},
    repetions: { type: Number, require: true },
    weight: { type: Number, require: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Set", setSchema);
