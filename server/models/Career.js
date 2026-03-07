const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  careerName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: "General"
  },
  shortDescription: {
    type: String,
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
  },
  averageSalary: {
    type: String,
    default: ""
  },
  jobOutlook: {
    type: String,
    default: ""
  },
  educationRequired: {
    type: String,
    default: ""
  },
  topColleges: {
    type: [String],
    default: []
  },
  relatedCareers: {
    type: [String],
    default: []
  },
  icon: {
    type: String,
    default: "work"
  }
}, { timestamps: true });

// Text index for search
careerSchema.index({ careerName: "text", title: "text", description: "text", category: "text" });

module.exports = mongoose.model("Career", careerSchema);
