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
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
