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
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
