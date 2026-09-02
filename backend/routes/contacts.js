const express = require("express");

const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

const router = express.Router();


// CUSTOMER SENDS MESSAGE
router.post("/", async (req, res) => {

    try {

        const contact =
            await Contact.create(req.body);

        res.status(201).json({
            message: "Message sent successfully",
            contact
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to send message",
            error: error.message
        });

    }
});


// ADMIN GETS MESSAGES
router.get("/", auth, async (req, res) => {

    try {

        const contacts =
            await Contact.find().sort({
                createdAt: -1
            });

        res.json(contacts);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch messages",
            error: error.message
        });

    }
});


// ADMIN UPDATES MESSAGE STATUS
router.put("/:id", auth, async (req, res) => {

    try {

        const contact =
            await Contact.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!contact) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        res.json({
            message: "Message updated",
            contact
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update message",
            error: error.message
        });

    }
});


module.exports = router;