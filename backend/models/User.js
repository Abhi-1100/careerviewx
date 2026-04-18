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
  phone: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  emailVerificationExpire: {
    type: Date,
    default: null
  },
  passwordResetToken: {
    type: String,
    default: null
  },
  passwordResetExpire: {
    type: Date,
    default: null
  },
  googleId: {
    type: String,
    default: null
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
      takenAt: { type: Date, default: Date.now },
      aiResult: {
        summary: { type: String },
        careers: [
          {
            title: { type: String },
            matchPercent: { type: Number },
            whyItFits: { type: String },
            stream: { type: String },
            skillsToLearn: [String],
            topColleges: [String]
          }
        ]
      }
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
