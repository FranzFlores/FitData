'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var sleepSchema = new Schema({
    hours: { type: String, require: true },
    date: { type: Date, require: true },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Sleep", sleepSchema);
