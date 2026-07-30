const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/students", studentRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Student Management System Server Running 🚀");
});

// Database Connection
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});