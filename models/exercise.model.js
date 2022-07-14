'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var exerciseSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    multimedia: { type: String },
    url: { type: String },
    id_muscle_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Muscle_Group",
        require: true
    },
    status: { type: Boolean, required: true, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Exercise", exerciseSchema);
