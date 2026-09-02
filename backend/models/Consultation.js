const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            default: ""
        },

        service: {
            type: String,
            default: ""
        },

        date: {
            type: Date
        },

        message: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "pending",
                "contacted",
                "completed",
                "cancelled"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Consultation",
    consultationSchema
);