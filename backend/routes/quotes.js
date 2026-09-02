const express = require("express");

const Quote = require("../models/Quote");
const auth = require("../middleware/auth");

const router = express.Router();


// CUSTOMER REQUESTS QUOTE
router.post("/", async (req, res) => {

    try {

        const quote =
            await Quote.create(req.body);

        res.status(201).json({
            message: "Quote request submitted",
            quote
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to submit quote",
            error: error.message
        });

    }
});


// ADMIN GETS QUOTES
router.get("/", auth, async (req, res) => {

    try {

        const quotes =
            await Quote.find().sort({
                createdAt: -1
            });

        res.json(quotes);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch quotes",
            error: error.message
        });

    }
});


// ADMIN UPDATES QUOTE
router.put("/:id", auth, async (req, res) => {

    try {

        const quote =
            await Quote.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!quote) {
            return res.status(404).json({
                message: "Quote not found"
            });
        }

        res.json({
            message: "Quote updated",
            quote
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update quote",
            error: error.message
        });

    }
});


module.exports = router;