const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("../models/Question");

const questionsData = [
  // Logical Reasoning MCQ (5 questions)
  {
    question: "If all roses are flowers and all flowers fade, what can be concluded about roses?",
    options: ["Roses fade", "Roses don't fade", "Some roses fade", "No roses fade"],
    correctAnswer: "Roses fade",
    category: "logical",
    type: "mcq"
  },
  {
    question: "Complete the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: "42",
    category: "logical",
    type: "mcq"
  },
  {
    question: "If A > B, B > C, and C > D, which statement is NOT necessarily true?",
    options: ["A > D", "B > D", "C < A", "A > C > B"],
    correctAnswer: "A > C > B",
    category: "logical",
    type: "mcq"
  },
  {
    question: "A man walks 3 km north, then 4 km west, then 3 km south. How far is he from his starting point?",
    options: ["3 km", "4 km", "5 km", "7 km"],
    correctAnswer: "4 km",
    category: "logical",
    type: "mcq"
  },
  {
    question: "If APPLE = 1, BANANA = 2, CHERRY = 3, what is GRAPE?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
    category: "logical",
    type: "mcq"
  },
  
  // Analytical Thinking MCQ (5 questions)
  {
    question: "What is the primary purpose of hypothesis in scientific research?",
    options: ["To prove a point", "To provide a testable prediction", "To collect data", "To draw conclusions"],
    correctAnswer: "To provide a testable prediction",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "Which of the following best describes analytical thinking?",
    options: ["Emotional reasoning", "Breaking down complex problems into components", "Following traditions", "Guessing outcomes"],
    correctAnswer: "Breaking down complex problems into components",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "In data analysis, what does correlation mean?",
    options: ["Causation between variables", "A relationship or pattern between variables", "Random occurrence", "A mathematical error"],
    correctAnswer: "A relationship or pattern between variables",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "Which thinking approach is best for solving complex engineering problems?",
    options: ["Trial and error", "Systematic breakdown with logical steps", "Intuition only", "Random experimentation"],
    correctAnswer: "Systematic breakdown with logical steps",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "What is the significance of sample size in statistical analysis?",
    options: ["Larger samples always give wrong answers", "Sample size affects reliability of conclusions", "It has no impact", "Only sample color matters"],
    correctAnswer: "Sample size affects reliability of conclusions",
    category: "analytical",
    type: "mcq"
  },

  // Subject Knowledge: Biology (2 questions)
  {
    question: "What is the primary function of mitochondria in a cell?",
    options: ["Protein synthesis", "Energy production (ATP)", "Photosynthesis", "Storing genetic material"],
    correctAnswer: "Energy production (ATP)",
    category: "biology",
    type: "mcq"
  },
  {
    question: "Which of the following is NOT a function of the liver?",
    options: ["Detoxification", "Nutrient storage", "Oxygen transport", "Bile production"],
    correctAnswer: "Oxygen transport",
    category: "biology",
    type: "mcq"
  },

  // Subject Knowledge: Commerce (2 questions)
  {
    question: "What does GDP measure?",
    options: ["Total government spending", "Total market value of goods and services produced", "Total unemployment rate", "Total imports only"],
    correctAnswer: "Total market value of goods and services produced",
    category: "commerce",
    type: "mcq"
  },
  {
    question: "What is the primary purpose of financial accounting?",
    options: ["Personal budgeting", "Recording and reporting financial transactions to stakeholders", "Tax evasion", "Marketing strategies"],
    correctAnswer: "Recording and reporting financial transactions to stakeholders",
    category: "commerce",
    type: "mcq"
  },

  // Subject Knowledge: Creativity (1 question)
  {
    question: "Which approach is most important for innovative product design?",
    options: ["Following existing trends exactly", "Combining creative thinking with user needs", "Copying competitors", "Ignoring feedback"],
    correctAnswer: "Combining creative thinking with user needs",
    category: "creativity",
    type: "mcq"
  },

  // Personality Type Questions with Weights (5 questions)
  {
    question: "I enjoy solving complex technical problems and working with data.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 2, medical: 0, design: 0, business: 1, it: 4, government: 1 },
      1: { engineering: 1, medical: 0, design: 0, business: 0, it: 2, government: 0 },
      2: { engineering: 1, medical: 1, design: 1, business: 1, it: 1, government: 1 },
      3: { engineering: 2, medical: 0, design: 0, business: 2, it: 3, government: 0 },
      4: { engineering: 4, medical: 0, design: 1, business: 2, it: 5, government: 1 }
    }
  },
  {
    question: "I prefer working with people and helping others achieve their goals.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 1, design: 0, business: 0, it: 0, government: 0 },
      1: { engineering: 0, medical: 2, design: 0, business: 1, it: 0, government: 1 },
      2: { engineering: 1, medical: 2, design: 2, business: 2, it: 1, government: 2 },
      3: { engineering: 0, medical: 3, design: 1, business: 3, it: 1, government: 3 },
      4: { engineering: 0, medical: 4, design: 1, business: 4, it: 0, government: 4 }
    }
  },
  {
    question: "I love creating visual solutions and expressing ideas through design.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 0, design: 1, business: 0, it: 0, government: 0 },
      1: { engineering: 0, medical: 0, design: 2, business: 0, it: 0, government: 0 },
      2: { engineering: 1, medical: 1, design: 2, business: 1, it: 1, government: 1 },
      3: { engineering: 1, medical: 0, design: 4, business: 2, it: 2, government: 0 },
      4: { engineering: 0, medical: 0, design: 5, business: 2, it: 1, government: 0 }
    }
  },
  {
    question: "I enjoy strategic planning and making business decisions.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 0, design: 0, business: 1, it: 0, government: 0 },
      1: { engineering: 0, medical: 0, design: 0, business: 2, it: 1, government: 0 },
      2: { engineering: 1, medical: 1, design: 1, business: 2, it: 2, government: 2 },
      3: { engineering: 2, medical: 0, design: 0, business: 4, it: 2, government: 1 },
      4: { engineering: 1, medical: 0, design: 0, business: 5, it: 2, government: 2 }
    }
  },
  {
    question: "I am interested in public service and contributing to society's growth.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 0, design: 0, business: 0, it: 0, government: 1 },
      1: { engineering: 0, medical: 1, design: 0, business: 0, it: 0, government: 2 },
      2: { engineering: 1, medical: 2, design: 1, business: 1, it: 1, government: 2 },
      3: { engineering: 1, medical: 2, design: 1, business: 2, it: 1, government: 4 },
      4: { engineering: 0, medical: 3, design: 1, business: 1, it: 0, government: 5 }
    }
  }
];

const seedQuestions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/careerviewx");
    console.log("📚 Connected to MongoDB");

    // Clear existing questions
    await Question.deleteMany({});
    console.log("🗑️  Cleared existing questions");

    // Insert new questions
    const result = await Question.insertMany(questionsData);
    console.log(`✅ Successfully inserted ${result.length} questions`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error seeding questions:", error.message);
    process.exit(1);
  }
};

seedQuestions();
