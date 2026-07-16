const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use("/students", studentRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Student Management System Server Running 🚀");
});

connectDB();
// Server Start
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:5000`);
});