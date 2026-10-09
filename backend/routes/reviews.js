
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Review = require("../models/Review");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads", "reviews");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 4 },
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowed = [".jpg", ".jpeg", ".png", ".webp"];

        if (
            allowed.includes(ext) &&
            /^image\/(jpeg|png|webp)$/.test(file.mimetype)
        ) {
            return cb(null, true);
        }

        cb(new Error("Upload JPG, PNG, or WebP images only."));
    }
});

// PUBLIC: Get approved reviews
router.get("/approved", async (_req, res) => {
    try {
        const reviews = await Review.find({ approved: true })
            .sort({ createdAt: -1 })
            .limit(30)
            .select("name projectType rating message photos createdAt");

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Could not load reviews." });
    }
});

// PUBLIC: Submit a review
router.post("/", (req, res) => {
    upload.array("photos", 4)(req, res, async (uploadError) => {
        if (uploadError) {
            return res.status(400).json({
                message: uploadError.message || "Photo upload failed."
            });
        }

        const photos = (req.files || []).map(
            file => `/uploads/reviews/${file.filename}`
        );

        try {
            const { name, projectType, rating, message } = req.body;

            const cleanName = String(name || "").trim();
            const cleanProject = String(projectType || "").trim();
            const cleanMessage = String(message || "").trim();
            const numericRating = Number(rating);

            if (
                !cleanName ||
                !cleanProject ||
                !cleanMessage ||
                cleanName.length > 80 ||
                cleanProject.length > 80 ||
                cleanMessage.length > 1200 ||
                !Number.isInteger(numericRating) ||
                numericRating < 1 ||
                numericRating > 5
            ) {
                (req.files || []).forEach(file =>
                    fs.unlink(file.path, () => {})
                );

                return res.status(400).json({
                    message: "Complete all fields and select a rating from 1 to 5."
                });
            }

            const review = await Review.create({
                name: cleanName,
                projectType: cleanProject,
                rating: numericRating,
                message: cleanMessage,
                photos,
                approved: false
            });

            res.status(201).json({
                message: "Review submitted. It will appear after admin approval.",
                reviewId: review._id
            });
        } catch (error) {
            (req.files || []).forEach(file =>
                fs.unlink(file.path, () => {})
            );

            res.status(500).json({
                message: "Could not submit your review."
            });
        }
    });
});

// ADMIN: Get pending reviews
router.get("/admin/pending", authMiddleware, async (req, res) => {
    if (req.admin.role !== "admin") {
        return res.status(403).json({ message: "Admin access required." });
    }

    try {
        const reviews = await Review.find({ approved: false })
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Could not load pending reviews." });
    }
});

// ADMIN: Get all reviews
router.get("/admin/all", authMiddleware, async (req, res) => {
    if (req.admin.role !== "admin") {
        return res.status(403).json({ message: "Admin access required." });
    }

    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Could not load reviews." });
    }
});

// ADMIN: Approve a review
router.patch("/admin/:id/approve", authMiddleware, async (req, res) => {
    if (req.admin.role !== "admin") {
        return res.status(403).json({ message: "Admin access required." });
    }

    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        res.json({
            message: "Review approved successfully.",
            review
        });
    } catch (error) {
        res.status(400).json({ message: "Could not approve review." });
    }
});

// ADMIN: Permanently delete a review and its photos
router.delete("/admin/:id", authMiddleware, async (req, res) => {
    if (req.admin.role !== "admin") {
        return res.status(403).json({ message: "Admin access required." });
    }

    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        await Review.findByIdAndDelete(req.params.id);

        for (const photo of review.photos || []) {
            // Only delete files stored in this app's review upload folder.
            const filename = path.basename(
                String(photo).split("?")[0]
            );
            const photoPath = path.join(uploadDir, filename);

            if (fs.existsSync(photoPath)) {
                await fs.promises.unlink(photoPath).catch(() => {});
            }
        }

        res.json({ message: "Review deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Could not delete review." });
    }
});

module.exports = router;
