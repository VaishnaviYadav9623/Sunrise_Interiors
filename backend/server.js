require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Sunrise Interior Studio Backend is running!"
    });
});

app.get("/api/test-db", (req, res) => {
    res.json({
        message: "MongoDB API is working!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});