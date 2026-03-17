// Database Seeder Script
// This script will populate MongoDB Atlas with Careers and Questions data

const mongoose = require("mongoose");
require("dotenv").config();
const Career = require("../models/Career");
const Question = require("../models/Question");

// Import seed data
const careersData = require("./careers");
const questionsData = require("./questions");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
    console.log("📦 Database:", mongoose.connection.name);

    // Clear existing data
    console.log("\n🗑️  Clearing existing data...");
    await Career.deleteMany({});
    await Question.deleteMany({});
    console.log("✅ Existing data cleared");

    // Insert Careers
    console.log("\n📚 Seeding Careers...");
    const careers = await Career.insertMany(careersData);
    console.log(`✅ ${careers.length} careers added successfully`);

    // Insert Questions
    console.log("\n❓ Seeding Questions...");
    const questions = await Question.insertMany(questionsData);
    console.log(`✅ ${questions.length} questions added successfully`);

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("🎉 DATABASE SEEDED SUCCESSFULLY!");
    console.log("=".repeat(50));
    console.log(`📊 Careers: ${careers.length}`);
    console.log(`📊 Questions: ${questions.length}`);
    console.log("\n✅ You can now check MongoDB Compass to see the data");
    
  } catch (error) {
    console.error("\n❌ Error seeding database:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔒 Connection closed");
  }
};

// Run the seeder
seedDatabase();
