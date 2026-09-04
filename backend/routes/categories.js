const express = require("express");

const Category = require("../models/Category");
const auth = require("../middleware/auth");

const router = express.Router();

const defaultCategories = [
    {
        name: "Kitchen",
        slug: "kitchen",
        description: "Kitchen planning, cabinetry and accessories."
    },
    {
        name: "Kitchen Trolleys",
        slug: "kitchen-trolleys",
        description: "Practical kitchen trolleys and storage solutions."
    },
    {
        name: "Wardrobes",
        slug: "wardrobes",
        description: "Built-in wardrobes and organised storage systems."
    },
    {
        name: "Furniture",
        slug: "furniture",
        description: "Custom furniture designed for everyday living."
    },
    {
        name: "TV Units",
        slug: "tv-units",
        description: "TV units, media walls and display storage."
    }
];

async function seedDefaultCategories() {
    await Promise.all(
        defaultCategories.map((category) =>
            Category.updateOne(
                { slug: category.slug },
                { $setOnInsert: category },
                { upsert: true }
            )
        )
    );
}

router.get("/", async (req, res) => {
    try {
        await seedDefaultCategories();
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch categories",
            error: error.message
        });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const name = req.body.name.trim();
        const slug = (req.body.slug || name)
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const category = await Category.create({
            name,
            slug,
            description: req.body.description || ""
        });

        res.status(201).json({
            message: "Category added successfully",
            category
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to add category",
            error: error.message
        });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const name = req.body.name.trim();
        const slug = (req.body.slug || name)
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name,
                slug,
                description: req.body.description || ""
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json({
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update category",
            error: error.message
        });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete category",
            error: error.message
        });
    }
});

module.exports = router;
