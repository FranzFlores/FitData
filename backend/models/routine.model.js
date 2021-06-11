'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var routineSchema = new Schema({
    name: { type: String, require: true },
    date: { type: Date, require: true },
    image: { type: String },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Routine", routineSchema);
