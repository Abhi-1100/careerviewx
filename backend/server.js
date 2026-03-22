const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "https://careerviewx.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Middleware
app.use(cors(corsOptions));
// Handle preflight OPTIONS requests for all routes
app.options("/{*splat}", cors(corsOptions));
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
