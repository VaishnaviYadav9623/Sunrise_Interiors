
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Quote = require("../models/Quote");
const auth = require("../middleware/auth");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },

    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const safeName =
            Date.now() + "-" +
            Math.round(Math.random() * 1e9) +
            extension;

        callback(null, safeName);
    }
});

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    },

    fileFilter: (req, file, callback) => {
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(
                new Error("Only JPG, PNG, WEBP and GIF images are allowed.")
            );
        }
    }
});


// CLIENT SUBMITS A QUOTE
router.post("/", (req, res) => {
    upload.array("referenceImages", 5)(req, res, async (error) => {
        if (error) {
            return res.status(400).json({
                message: error.message
            });
        }

        try {
            const {
                name,
                email,
                phone,
                service,
                budget,
                message
            } = req.body;

            if (!name || !email) {
                return res.status(400).json({
                    message: "Name and email are required."
                });
            }

            const referenceImages = (req.files || []).map(
                file => `/uploads/${file.filename}`
            );

            const quote = await Quote.create({
                name,
                email,
                phone,
                service,
                budget,
                message,
                referenceImages
            });

            return res.status(201).json({
                message: "Quote request submitted successfully.",
                quote
            });

        } catch (err) {
            // Remove uploaded files if saving the quote fails.
            for (const file of req.files || []) {
                fs.unlink(file.path, () => {});
            }

            return res.status(400).json({
                message: "Failed to submit quote.",
                error: err.message
            });
        }
    });
});


// ADMIN VIEWS QUOTES
router.get("/", auth, async (req, res) => {
    try {
        const quotes = await Quote.find().sort({
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


// ADMIN UPDATES QUOTE STATUS
router.put("/:id", auth, async (req, res) => {
    try {
        const allowedStatuses = [
            "pending",
            "reviewed",
            "approved",
            "rejected"
        ];

        if (
            req.body.status &&
            !allowedStatuses.includes(req.body.status)
        ) {
            return res.status(400).json({
                message: "Invalid quotation status."
            });
        }

        const quote = await Quote.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
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
