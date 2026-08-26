require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {

    res.json({
        message: "Sunrise Interior Studio Backend is running!"
    });

});


app.get("/api/test-db", (req, res) => {

    db.query("SELECT 1 AS test", (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database connection failed",
                error: err.message
            });

        }

        res.json({
            message: "Database connected successfully!",
            result: result
        });

    });

});


const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});