const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/assessment", require("./routes/assessment"));
app.use("/api/careers", require("./routes/careers"));

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "CareerViewX API is running" });
});

// Start Server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
}

// Export for Vercel Serverless
module.exports = app;
