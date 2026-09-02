const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            default: ""
        },

        service: {
            type: String,
            default: ""
        },

        budget: {
            type: String,
            default: ""
        },

        message: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "pending",
                "reviewed",
                "approved",
                "rejected"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Quote", quoteSchema);