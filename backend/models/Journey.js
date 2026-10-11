const mongoose = require("mongoose");

const journeyEntrySchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5,
        match: /^\d{4}\+?$/
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    }
});

const journeySchema = new mongoose.Schema({
    _id: {
        type: String,
        default: "about-journey"
    },
    entries: {
        type: [journeyEntrySchema],
        default: []
    }
});

module.exports = mongoose.model("Journey", journeySchema);
