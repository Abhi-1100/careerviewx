const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 4 || v.length === 5; // Allow 4 for MCQ, 5 for personality
      },
      message: "Options array must contain 4 or 5 options"
    }
  },
  correctAnswer: {
    type: String,
    default: null // null for personality type questions
  },
  category: {
    type: String,
    enum: ["logical", "analytical", "biology", "commerce", "creativity", "personality"],
    required: true
  },
  type: {
    type: String,
    enum: ["mcq", "personality"],
    required: true
  },
  weights: {
    type: mongoose.Schema.Types.Mixed,
    default: null // null for mcq type questions
  }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
