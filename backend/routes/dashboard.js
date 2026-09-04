const express = require("express");

const Product = require("../models/Product");
const Project = require("../models/Project");
const Consultation =
    require("../models/Consultation");
const Quote = require("../models/Quote");
const Contact = require("../models/Contact");

const auth = require("../middleware/auth");

const router = express.Router();


// DASHBOARD STATISTICS
router.get("/stats", auth, async (req, res) => {

    try {

        const products =
            await Product.countDocuments();

        const categories =
            await Product.distinct("category");

        const projects =
            await Project.countDocuments();

        const consultations =
            await Consultation.countDocuments();

        const quotes =
            await Quote.countDocuments();

        const contacts =
            await Contact.countDocuments();

        const pendingConsultations =
            await Consultation.countDocuments({
                status: "pending"
            });

        const pendingQuotes =
            await Quote.countDocuments({
                status: "pending"
            });

        const unreadContacts =
            await Contact.countDocuments({
                status: "unread"
            });

        res.json({
            products,
            categories: categories.length,
            projects,
            consultations,
            quotes,
            contacts,
            pendingConsultations,
            pendingQuotes,
            unreadContacts
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to load dashboard statistics",
            error: error.message
        });

    }
});


module.exports = router;