const express = require("express");

const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();


// GET ALL PRODUCTS
router.get("/", async (req, res) => {

    try {

        const products =
            await Product.find().sort({
                createdAt: -1
            });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });

    }
});

// GET PUBLISHED PRODUCTS
router.get("/public", async (req, res) => {

    try {

        const products =
            await Product.find({
                available: true
            }).sort({
                createdAt: -1
            });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch published products",
            error: error.message
        });

    }

});


// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {

    try {

        const product =
            await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch product",
            error: error.message
        });

    }
});


// ADD PRODUCT
router.post("/", auth, async (req, res) => {

    try {

        const product =
            await Product.create(req.body);

        res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to add product",
            error: error.message
        });

    }
});


// UPDATE PRODUCT
router.put("/:id", auth, async (req, res) => {

    try {

        const product =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update product",
            error: error.message
        });

    }
});


// DELETE PRODUCT
router.delete("/:id", auth, async (req, res) => {

    try {

        const product =
            await Product.findByIdAndDelete(
                req.params.id
            );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });

    }
});


module.exports = router;