const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  careerName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  skillsRequired: {
    type: [String],
    required: true
  },
  exams: {
    type: [String],
    required: true
  },
  roadmap: {
    type: [String],
    required: true
  },
  salaryRange: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Career", careerSchema);
