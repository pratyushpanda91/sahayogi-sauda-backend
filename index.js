const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const dealRoutes = require("./routes/deals");
const supplierRoutes = require("./routes/supplier");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Sahayogi Sauda API!");
});
app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/supplier", supplierRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
