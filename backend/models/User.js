const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  education: {
    type: String,
    default: ""
  },
  stream: {
    type: String,
    default: ""
  },
  careerSuggestions: {
    type: [String],
    default: []
  },
  recommendedCareer: {
    type: String,
    default: null
  },
  assessmentScore: {
    type: {
      engineering: Number,
      medical: Number,
      design: Number,
      business: Number,
      it: Number,
      government: Number
    },
    default: null
  },
  assessmentHistory: [
    {
      recommendedCareer: { type: String },
      scores: {
        engineering: Number,
        medical: Number,
        design: Number,
        business: Number,
        it: Number,
        government: Number
      },
      matchPercentage: { type: Number },
      takenAt: { type: Date, default: Date.now }
    }
  ],
  careerPaths: [
    {
      careerName: { type: String, required: true },
      education: { type: String },
      stream: { type: String },
      matchPercentage: { type: Number },
      addedDate: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
