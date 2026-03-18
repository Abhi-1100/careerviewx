const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://careerviewx.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));
app.use(express.json());

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
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Failed to start server due to database connection error:", error.message);
    process.exit(1);
  });

// Export for Vercel Serverless
module.exports = app;
