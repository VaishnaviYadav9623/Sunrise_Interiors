require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const authRoutes =
    require("./routes/auth");

const productRoutes =
    require("./routes/products");

const categoryRoutes =
    require("./routes/categories");

const projectRoutes =
    require("./routes/projects");

const consultationRoutes =
    require("./routes/consultations");

const quoteRoutes =
    require("./routes/quotes");

const contactRoutes =
    require("./routes/contacts");

const dashboardRoutes =
    require("./routes/dashboard");


const app = express();


// Middleware
app.use(cors());

app.use(express.json({
    limit: "10mb"
}));

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb"
    })
);


// Connect MongoDB
connectDB();


// Home route
app.get("/", (req, res) => {

    res.json({
        message:
            "Sunrise Interior Studio Backend is running!"
    });

});


// Test database/API
app.get("/api/test-db", (req, res) => {

    res.json({
        message:
            "MongoDB API is working!"
    });

});


// API routes
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/categories",
    categoryRoutes
);

app.use(
    "/api/projects",
    projectRoutes
);

app.use(
    "/api/consultations",
    consultationRoutes
);

app.use(
    "/api/quotes",
    quoteRoutes
);

app.use(
    "/api/contacts",
    contactRoutes
);

app.use(
    "/api/dashboard",
    dashboardRoutes
);


// 404 route
app.use((req, res) => {

    res.status(404).json({
        message: "API endpoint not found"
    });

});


// Start server
const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});