const express = require("express");

const Project = require("../models/Project");
const auth = require("../middleware/auth");

const router = express.Router();


// GET PROJECTS
router.get("/", async (req, res) => {

    try {

        const projects =
            await Project.find().sort({
                createdAt: -1
            });

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message
        });

    }
});


// GET SINGLE PROJECT
router.get("/:id", async (req, res) => {

    try {

        const project =
            await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json(project);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch project",
            error: error.message
        });

    }
});


// ADD PROJECT
router.post("/", auth, async (req, res) => {

    try {

        const project =
            await Project.create(req.body);

        res.status(201).json({
            message: "Project added successfully",
            project
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to add project",
            error: error.message
        });

    }
});


// UPDATE PROJECT
router.put("/:id", auth, async (req, res) => {

    try {

        const project =
            await Project.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json({
            message: "Project updated successfully",
            project
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update project",
            error: error.message
        });

    }
});


// DELETE PROJECT
router.delete("/:id", auth, async (req, res) => {

    try {

        const project =
            await Project.findByIdAndDelete(
                req.params.id
            );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json({
            message: "Project deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete project",
            error: error.message
        });

    }
});


module.exports = router;