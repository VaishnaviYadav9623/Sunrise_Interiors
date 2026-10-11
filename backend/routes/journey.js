const express = require("express");

const Journey = require("../models/Journey");
const auth = require("../middleware/auth");

const router = express.Router();

const defaultEntries = [
    {
        year: "2014",
        title: "The Beginning",
        description:
            "Sunrise Interior Studio was established with a small team and a vision to create beautiful interior spaces."
    },
    {
        year: "2016",
        title: "Growing Strong",
        description:
            "We expanded our services and completed our first major residential projects."
    },
    {
        year: "2019",
        title: "Building Trust",
        description:
            "Our dedication to quality helped us build long-lasting relationships with customers."
    },
    {
        year: "2023+",
        title: "Continuing the Legacy",
        description:
            "We continue to innovate and create interiors that combine style, comfort and functionality."
    }
];

function isAdmin(req, res) {
    if (req.admin.role === "admin") {
        return true;
    }

    res.status(403).json({ message: "Admin access required." });
    return false;
}

router.get("/", async (_req, res) => {
    try {
        const journey = await Journey.findByIdAndUpdate(
            "about-journey",
            { $setOnInsert: { entries: defaultEntries } },
            { new: true, upsert: true, setDefaultsOnInsert: false }
        );

        res.json(journey.entries);
    } catch (error) {
        res.status(500).json({ message: "Could not load the studio journey." });
    }
});

router.put("/", auth, async (req, res) => {
    if (!isAdmin(req, res)) {
        return;
    }

    const submittedEntries = req.body && req.body.entries;

    if (!Array.isArray(submittedEntries) || submittedEntries.length > 50) {
        return res.status(400).json({
            message: "Provide up to 50 journey milestones."
        });
    }

    const entries = submittedEntries.map(entry => {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
            return null;
        }

        return {
            year: typeof entry.year === "string" ? entry.year.trim() : "",
            title: typeof entry.title === "string" ? entry.title.trim() : "",
            description: typeof entry.description === "string"
                ? entry.description.trim()
                : ""
        };
    });

    const invalidEntry = entries.some(entry =>
        !entry ||
        !/^\d{4}\+?$/.test(entry.year) ||
        !entry.title ||
        entry.title.length > 100 ||
        !entry.description ||
        entry.description.length > 1000
    );

    if (invalidEntry) {
        return res.status(400).json({
            message: "Enter a valid year, title, and description for every milestone."
        });
    }

    entries.sort((first, second) =>
        first.year.localeCompare(second.year)
    );

    try {
        const journey = await Journey.findByIdAndUpdate(
            "about-journey",
            { $set: { entries } },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            }
        );

        res.json({
            message: "Journey updated successfully.",
            entries: journey.entries
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not save the studio journey."
        });
    }
});

module.exports = router;
