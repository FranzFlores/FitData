'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var progressSchema = new Schema({
    weight: { type: Number, require: true },
    measurementDate: { type: Date, require: true },
    images: [{
        fileName: { type: String }
    }],
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Progress", progressSchema);
