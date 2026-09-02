const express = require("express");

const Consultation =
    require("../models/Consultation");

const auth = require("../middleware/auth");

const router = express.Router();


// CUSTOMER SENDS CONSULTATION
router.post("/", async (req, res) => {

    try {

        const consultation =
            await Consultation.create(req.body);

        res.status(201).json({
            message: "Consultation request submitted",
            consultation
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to submit consultation",
            error: error.message
        });

    }
});


// ADMIN GETS CONSULTATIONS
router.get("/", auth, async (req, res) => {

    try {

        const consultations =
            await Consultation.find().sort({
                createdAt: -1
            });

        res.json(consultations);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch consultations",
            error: error.message
        });

    }
});


// ADMIN UPDATES CONSULTATION
router.put("/:id", auth, async (req, res) => {

    try {

        const consultation =
            await Consultation.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!consultation) {
            return res.status(404).json({
                message: "Consultation not found"
            });
        }

        res.json({
            message: "Consultation updated",
            consultation
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update consultation",
            error: error.message
        });

    }
});


module.exports = router;