const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("../models/Question");

const questionsData = [
  // Logical Reasoning MCQ (15 questions)
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
  {
    question: "Find the odd one out: Triangle, Square, Circle, Rectangle, Pentagon",
    options: ["Triangle", "Square", "Circle", "Rectangle"],
    correctAnswer: "Circle",
    category: "logical",
    type: "mcq"
  },
  {
    question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
    correctAnswer: "5 minutes",
    category: "logical",
    type: "mcq"
  },
  {
    question: "Which number should replace the question mark: 3, 7, 15, 31, ?",
    options: ["47", "59", "63", "127"],
    correctAnswer: "63",
    category: "logical",
    type: "mcq"
  },
  {
    question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
    options: ["0°", "7.5°", "15°", "30°"],
    correctAnswer: "7.5°",
    category: "logical",
    type: "mcq"
  },
  {
    question: "If some Apples are Oranges and all Oranges are Bananas, which is definitely true?",
    options: ["All Apples are Bananas", "Some Apples are Bananas", "No Apples are Bananas", "All Bananas are Apples"],
    correctAnswer: "Some Apples are Bananas",
    category: "logical",
    type: "mcq"
  },
  {
    question: "What comes next in the pattern: A, C, F, J, ?",
    options: ["M", "N", "O", "P"],
    correctAnswer: "O",
    category: "logical",
    type: "mcq"
  },
  {
    question: "If 5 cats catch 5 mice in 5 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
    options: ["1 cat", "5 cats", "20 cats", "100 cats"],
    correctAnswer: "5 cats",
    category: "logical",
    type: "mcq"
  },
  {
    question: "Which does not belong: Lion, Tiger, Elephant, Leopard, Cheetah?",
    options: ["Lion", "Tiger", "Elephant", "Leopard"],
    correctAnswer: "Elephant",
    category: "logical",
    type: "mcq"
  },
  {
    question: "A is taller than B, B is taller than C, D is taller than A. Who is the shortest?",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    category: "logical",
    type: "mcq"
  },
  {
    question: "What number should replace the question mark: 1, 1, 2, 6, 24, ?",
    options: ["48", "96", "120", "720"],
    correctAnswer: "120",
    category: "logical",
    type: "mcq"
  },
  
  // Analytical Thinking MCQ (15 questions)
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
  {
    question: "What is the first step in problem-solving?",
    options: ["Implement a solution", "Define and understand the problem", "Brainstorm solutions", "Test the solution"],
    correctAnswer: "Define and understand the problem",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "Which data visualization is best for showing proportions of a whole?",
    options: ["Line graph", "Bar chart", "Pie chart", "Scatter plot"],
    correctAnswer: "Pie chart",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "What does 'critical thinking' primarily involve?",
    options: ["Criticizing others", "Objectively analyzing and evaluating information", "Following rules", "Memorizing facts"],
    correctAnswer: "Objectively analyzing and evaluating information",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "In research methodology, what is the independent variable?",
    options: ["The outcome being measured", "The variable that is manipulated", "The constant factor", "The error margin"],
    correctAnswer: "The variable that is manipulated",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "What is meant by 'root cause analysis'?",
    options: ["Analyzing plant roots", "Finding the fundamental cause of a problem", "Surface-level investigation", "Random testing"],
    correctAnswer: "Finding the fundamental cause of a problem",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "Which method is used to test the validity of a hypothesis?",
    options: ["Opinion polls", "Controlled experiments", "Guessing", "Tradition"],
    correctAnswer: "Controlled experiments",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "What does SWOT analysis stand for?",
    options: ["Strengths, Weaknesses, Opportunities, Threats", "System, Work, Order, Time", "Survey, Watch, Operate, Test", "Speed, Weight, Output, Target"],
    correctAnswer: "Strengths, Weaknesses, Opportunities, Threats",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "What is the purpose of A/B testing?",
    options: ["Testing alphabets", "Comparing two versions to determine which performs better", "Testing blood types", "Academic examination"],
    correctAnswer: "Comparing two versions to determine which performs better",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "In problem-solving, what does 'iteration' mean?",
    options: ["Giving up", "Repeating and refining the process", "Starting over completely", "Ignoring feedback"],
    correctAnswer: "Repeating and refining the process",
    category: "analytical",
    type: "mcq"
  },
  {
    question: "What is meant by 'bias' in research?",
    options: ["Personal preference affecting objectivity", "Accurate measurement", "Scientific method", "Data collection"],
    correctAnswer: "Personal preference affecting objectivity",
    category: "analytical",
    type: "mcq"
  },

  // Subject Knowledge: Biology (8 questions)
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
  {
    question: "What is the basic unit of life?",
    options: ["Atom", "Molecule", "Cell", "Tissue"],
    correctAnswer: "Cell",
    category: "biology",
    type: "mcq"
  },
  {
    question: "Which organ is responsible for filtering blood?",
    options: ["Liver", "Heart", "Kidney", "Lungs"],
    correctAnswer: "Kidney",
    category: "biology",
    type: "mcq"
  },
  {
    question: "What is DNA?",
    options: ["A type of protein", "Genetic material", "A carbohydrate", "An enzyme"],
    correctAnswer: "Genetic material",
    category: "biology",
    type: "mcq"
  },
  {
    question: "Which process do plants use to make food?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
    correctAnswer: "Photosynthesis",
    category: "biology",
    type: "mcq"
  },
  {
    question: "What type of blood cells fight infections?",
    options: ["Red blood cells", "White blood cells", "Platelets", "Plasma cells"],
    correctAnswer: "White blood cells",
    category: "biology",
    type: "mcq"
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Liver", "Brain", "Skin", "Heart"],
    correctAnswer: "Skin",
    category: "biology",
    type: "mcq"
  },

  // Subject Knowledge: Commerce (8 questions)
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
  {
    question: "What is a stock?",
    options: ["A loan to a company", "Ownership share in a company", "Government bond", "Fixed deposit"],
    correctAnswer: "Ownership share in a company",
    category: "commerce",
    type: "mcq"
  },
  {
    question: "What does ROI stand for in business?",
    options: ["Rate Of Investment", "Return On Investment", "Risk Of Income", "Rate Of Interest"],
    correctAnswer: "Return On Investment",
    category: "commerce",
    type: "mcq"
  },
  {
    question: "What is inflation?",
    options: ["Decrease in prices", "Increase in general price level", "Unemployment rate", "Interest rate"],
    correctAnswer: "Increase in general price level",
    category: "commerce",
    type: "mcq"
  },
  {
    question: "What is a balance sheet?",
    options: ["Income statement", "Financial snapshot showing assets and liabilities", "Marketing plan", "Employee roster"],
    correctAnswer: "Financial snapshot showing assets and liabilities",
    category: "commerce",
    type: "mcq"
  },
  {
    question: "What does GST stand for?",
    options: ["General Sales Tax", "Goods and Services Tax", "Government Standard Tax", "Global Service Tax"],
    correctAnswer: "Goods and Services Tax",
    category: "commerce",
    type: "mcq"
  },
  {
    question: "What is the primary function of a central bank?",
    options: ["Provide loans to individuals", "Regulate monetary policy", "Sell insurance", "Manage retail banking"],
    correctAnswer: "Regulate monetary policy",
    category: "commerce",
    type: "mcq"
  },

  // Subject Knowledge: Physics (6 questions)
  {
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: "Newton",
    category: "physics",
    type: "mcq"
  },
  {
    question: "What does Newton's First Law state?",
    options: ["Force equals mass times acceleration", "Objects remain at rest or in motion unless acted upon", "Every action has an equal reaction", "Energy cannot be created or destroyed"],
    correctAnswer: "Objects remain at rest or in motion unless acted upon",
    category: "physics",
    type: "mcq"
  },
  {
    question: "What is the speed of light in vacuum?",
    options: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^10 m/s", "3 × 10^5 m/s"],
    correctAnswer: "3 × 10^8 m/s",
    category: "physics",
    type: "mcq"
  },
  {
    question: "What type of energy is stored in a battery?",
    options: ["Kinetic energy", "Chemical energy", "Nuclear energy", "Thermal energy"],
    correctAnswer: "Chemical energy",
    category: "physics",
    type: "mcq"
  },
  {
    question: "What is the principle behind electric motors?",
    options: ["Electromagnetic induction", "Nuclear fission", "Chemical reaction", "Gravitational force"],
    correctAnswer: "Electromagnetic induction",
    category: "physics",
    type: "mcq"
  },
  {
    question: "What is absolute zero in Celsius?",
    options: ["0°C", "-100°C", "-273.15°C", "-373.15°C"],
    correctAnswer: "-273.15°C",
    category: "physics",
    type: "mcq"
  },

  // Subject Knowledge: Mathematics (6 questions)
  {
    question: "What is the value of π (pi) approximately?",
    options: ["2.14", "3.14", "4.14", "5.14"],
    correctAnswer: "3.14",
    category: "mathematics",
    type: "mcq"
  },
  {
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²", "2x²"],
    correctAnswer: "2x",
    category: "mathematics",
    type: "mcq"
  },
  {
    question: "What is the Pythagorean theorem?",
    options: ["a + b = c", "a² + b² = c²", "a × b = c", "a² - b² = c²"],
    correctAnswer: "a² + b² = c²",
    category: "mathematics",
    type: "mcq"
  },
  {
    question: "What is the sum of angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    correctAnswer: "180°",
    category: "mathematics",
    type: "mcq"
  },
  {
    question: "What is the quadratic formula used for?",
    options: ["Calculating area", "Solving quadratic equations", "Finding derivatives", "Calculating probability"],
    correctAnswer: "Solving quadratic equations",
    category: "mathematics",
    type: "mcq"
  },
  {
    question: "What is a prime number?",
    options: ["Divisible by 2", "Divisible only by 1 and itself", "An even number", "A fraction"],
    correctAnswer: "Divisible only by 1 and itself",
    category: "mathematics",
    type: "mcq"
  },

  // Subject Knowledge: Computer Science (6 questions)
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mode Language"],
    correctAnswer: "Hyper Text Markup Language",
    category: "computer",
    type: "mcq"
  },
  {
    question: "Which programming language is known as the 'mother of all languages'?",
    options: ["Java", "C", "Python", "BASIC"],
    correctAnswer: "C",
    category: "computer",
    type: "mcq"
  },
  {
    question: "What is an algorithm?",
    options: ["A programming language", "Step-by-step procedure to solve a problem", "A computer virus", "A type of hardware"],
    correctAnswer: "Step-by-step procedure to solve a problem",
    category: "computer",
    type: "mcq"
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Question Language", "System Quality Language", "Standard Queue Language"],
    correctAnswer: "Structured Query Language",
    category: "computer",
    type: "mcq"
  },
  {
    question: "What is the brain of a computer called?",
    options: ["RAM", "Hard Drive", "CPU", "Monitor"],
    correctAnswer: "CPU",
    category: "computer",
    type: "mcq"
  },
  {
    question: "What is cloud computing?",
    options: ["Computing in the sky", "Storing and accessing data over the internet", "Weather forecasting", "Wireless technology"],
    correctAnswer: "Storing and accessing data over the internet",
    category: "computer",
    type: "mcq"
  },

  // Subject Knowledge: Creativity & Arts (8 questions)
  {
    question: "Which approach is most important for innovative product design?",
    options: ["Following existing trends exactly", "Combining creative thinking with user needs", "Copying competitors", "Ignoring feedback"],
    correctAnswer: "Combining creative thinking with user needs",
    category: "creativity",
    type: "mcq"
  },
  {
    question: "What are the primary colors?",
    options: ["Red, Blue, Yellow", "Red, Green, Blue", "Blue, Yellow, Green", "Orange, Purple, Green"],
    correctAnswer: "Red, Blue, Yellow",
    category: "creativity",
    type: "mcq"
  },
  {
    question: "What is the rule of thirds in photography and design?",
    options: ["Dividing image into thirds for better composition", "Taking three photos", "Using three colors", "Three-second rule"],
    correctAnswer: "Dividing image into thirds for better composition",
    category: "creativity",
    type: "mcq"
  },
  {
    question: "What is brainstorming?",
    options: ["A weather phenomenon", "Group creative thinking to generate ideas", "Individual meditation", "Academic testing"],
    correctAnswer: "Group creative thinking to generate ideas",
    category: "creativity",
    type: "mcq"
  },
  {
    question: "What is UX in design?",
    options: ["User Experience", "Ultra X-ray", "Unique Expertise", "Universal Export"],
    correctAnswer: "User Experience",
    category: "creativity",
    type: "mcq"
  },
  {
    question: "What is a mood board used for?",
    options: ["Tracking emotions", "Visual inspiration and concept development", "Weather forecasting", "Medical diagnosis"],
    correctAnswer: "Visual inspiration and concept development",
    category: "creativity",
    type: "mcq"
  },
  {
    question: "What is typography?",
    options: ["Study of types", "Art and technique of arranging type", "Printing machine", "Writing style"],
    correctAnswer: "Art and technique of arranging type",
    category: "creativity",
    type: "mcq"
  },
  {
    question: "What does RGB stand for in color theory?",
    options: ["Red, Green, Blue", "Real, Good, Best", "Rapid, Graphic, Bold", "Red, Gray, Black"],
    correctAnswer: "Red, Green, Blue",
    category: "creativity",
    type: "mcq"
  },

  // Subject Knowledge: Social Science & Law (4 questions)
  {
    question: "What is the Constitution?",
    options: ["A medical term", "Supreme law of the land", "A building", "A political party"],
    correctAnswer: "Supreme law of the land",
    category: "social_science",
    type: "mcq"
  },
  {
    question: "What does PIL stand for in law?",
    options: ["Public Interest Litigation", "Private Interest Law", "Personal Identity License", "Public Investment Loan"],
    correctAnswer: "Public Interest Litigation",
    category: "social_science",
    type: "mcq"
  },
  {
    question: "Who is known as the Father of the Indian Constitution?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
    correctAnswer: "Dr. B.R. Ambedkar",
    category: "social_science",
    type: "mcq"
  },
  {
    question: "What is democracy?",
    options: ["Rule by military", "Government by the people", "Monarchy", "Dictatorship"],
    correctAnswer: "Government by the people",
    category: "social_science",
    type: "mcq"
  },

  // Personality Type Questions with Weights (10 questions)
  {
    question: "I enjoy solving complex technical problems and working with data.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 2, medical: 0, design: 0, business: 1, it: 4, government: 1, architecture: 1, data_science: 4, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 0, hospitality: 0, digital_marketing: 1 },
      1: { engineering: 1, medical: 0, design: 0, business: 0, it: 2, government: 0, architecture: 0, data_science: 2, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 0, hospitality: 0, digital_marketing: 0 },
      2: { engineering: 1, medical: 1, design: 1, business: 1, it: 1, government: 1, architecture: 1, data_science: 1, law: 1, psychology: 1, teaching: 1, arts: 1, aviation: 1, hospitality: 1, digital_marketing: 1 },
      3: { engineering: 2, medical: 0, design: 0, business: 2, it: 3, government: 0, architecture: 1, data_science: 4, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 0, hospitality: 0, digital_marketing: 2 },
      4: { engineering: 4, medical: 0, design: 1, business: 2, it: 5, government: 1, architecture: 2, data_science: 5, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 1, hospitality: 0, digital_marketing: 2 }
    }
  },
  {
    question: "I prefer working with people and helping others achieve their goals.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 1, design: 0, business: 0, it: 0, government: 0, architecture: 0, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 0, hospitality: 0, digital_marketing: 0 },
      1: { engineering: 0, medical: 2, design: 0, business: 1, it: 0, government: 1, architecture: 0, data_science: 0, law: 1, psychology: 2, teaching: 2, arts: 0, aviation: 1, hospitality: 2, digital_marketing: 1 },
      2: { engineering: 1, medical: 2, design: 2, business: 2, it: 1, government: 2, architecture: 1, data_science: 1, law: 2, psychology: 2, teaching: 2, arts: 2, aviation: 2, hospitality: 2, digital_marketing: 2 },
      3: { engineering: 0, medical: 3, design: 1, business: 3, it: 1, government: 3, architecture: 0, data_science: 0, law: 2, psychology: 4, teaching: 4, arts: 1, aviation: 2, hospitality: 4, digital_marketing: 2 },
      4: { engineering: 0, medical: 4, design: 1, business: 4, it: 0, government: 4, architecture: 0, data_science: 0, law: 2, psychology: 5, teaching: 5, arts: 1, aviation: 3, hospitality: 5, digital_marketing: 2 }
    }
  },
  {
    question: "I love creating visual solutions and expressing ideas through design.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 0, design: 1, business: 0, it: 0, government: 0, architecture: 1, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 1, aviation: 0, hospitality: 0, digital_marketing: 1 },
      1: { engineering: 0, medical: 0, design: 2, business: 0, it: 0, government: 0, architecture: 2, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 2, aviation: 0, hospitality: 1, digital_marketing: 2 },
      2: { engineering: 1, medical: 1, design: 2, business: 1, it: 1, government: 1, architecture: 2, data_science: 1, law: 1, psychology: 1, teaching: 1, arts: 2, aviation: 1, hospitality: 1, digital_marketing: 2 },
      3: { engineering: 1, medical: 0, design: 4, business: 2, it: 2, government: 0, architecture: 4, data_science: 1, law: 0, psychology: 0, teaching: 1, arts: 4, aviation: 0, hospitality: 2, digital_marketing: 4 },
      4: { engineering: 0, medical: 0, design: 5, business: 2, it: 1, government: 0, architecture: 5, data_science: 1, law: 0, psychology: 0, teaching: 1, arts: 5, aviation: 0, hospitality: 2, digital_marketing: 5 }
    }
  },
  {
    question: "I enjoy strategic planning and making business decisions.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 0, design: 0, business: 1, it: 0, government: 0, architecture: 0, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 1, hospitality: 0, digital_marketing: 1 },
      1: { engineering: 0, medical: 0, design: 0, business: 2, it: 1, government: 0, architecture: 0, data_science: 1, law: 1, psychology: 0, teaching: 0, arts: 0, aviation: 1, hospitality: 1, digital_marketing: 2 },
      2: { engineering: 1, medical: 1, design: 1, business: 2, it: 2, government: 2, architecture: 1, data_science: 2, law: 2, psychology: 1, teaching: 1, arts: 1, aviation: 2, hospitality: 2, digital_marketing: 2 },
      3: { engineering: 2, medical: 0, design: 0, business: 4, it: 2, government: 1, architecture: 1, data_science: 2, law: 2, psychology: 1, teaching: 1, arts: 0, aviation: 3, hospitality: 3, digital_marketing: 4 },
      4: { engineering: 1, medical: 0, design: 0, business: 5, it: 2, government: 2, architecture: 1, data_science: 2, law: 2, psychology: 1, teaching: 1, arts: 0, aviation: 4, hospitality: 4, digital_marketing: 5 }
    }
  },
  {
    question: "I am interested in public service and contributing to society's growth.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 0, design: 0, business: 0, it: 0, government: 1, architecture: 0, data_science: 0, law: 1, psychology: 0, teaching: 0, arts: 0, aviation: 0, hospitality: 0, digital_marketing: 0 },
      1: { engineering: 0, medical: 1, design: 0, business: 0, it: 0, government: 2, architecture: 0, data_science: 0, law: 2, psychology: 1, teaching: 1, arts: 0, aviation: 0, hospitality: 0, digital_marketing: 0 },
      2: { engineering: 1, medical: 2, design: 1, business: 1, it: 1, government: 2, architecture: 1, data_science: 1, law: 2, psychology: 2, teaching: 2, arts: 1, aviation: 1, hospitality: 1, digital_marketing: 1 },
      3: { engineering: 1, medical: 2, design: 1, business: 2, it: 1, government: 4, architecture: 1, data_science: 1, law: 4, psychology: 3, teaching: 4, arts: 1, aviation: 1, hospitality: 1, digital_marketing: 1 },
      4: { engineering: 0, medical: 3, design: 1, business: 1, it: 0, government: 5, architecture: 1, data_science: 0, law: 5, psychology: 4, teaching: 5, arts: 1, aviation: 1, hospitality: 1, digital_marketing: 0 }
    }
  },
  {
    question: "I am fascinated by how things work and enjoy building or fixing things.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 1, medical: 0, design: 0, business: 0, it: 0, government: 0, architecture: 1, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 1, hospitality: 0, digital_marketing: 0 },
      1: { engineering: 2, medical: 0, design: 1, business: 0, it: 1, government: 0, architecture: 2, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 2, hospitality: 0, digital_marketing: 0 },
      2: { engineering: 2, medical: 1, design: 1, business: 1, it: 1, government: 1, architecture: 2, data_science: 1, law: 1, psychology: 1, teaching: 1, arts: 1, aviation: 2, hospitality: 1, digital_marketing: 1 },
      3: { engineering: 4, medical: 0, design: 2, business: 1, it: 3, government: 0, architecture: 4, data_science: 2, law: 0, psychology: 0, teaching: 0, arts: 1, aviation: 4, hospitality: 0, digital_marketing: 1 },
      4: { engineering: 5, medical: 0, design: 2, business: 1, it: 4, government: 0, architecture: 5, data_science: 2, law: 0, psychology: 0, teaching: 0, arts: 1, aviation: 5, hospitality: 0, digital_marketing: 1 }
    }
  },
  {
    question: "I enjoy analyzing human behavior and understanding what motivates people.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 0, design: 0, business: 0, it: 0, government: 0, architecture: 0, data_science: 0, law: 0, psychology: 1, teaching: 0, arts: 0, aviation: 0, hospitality: 0, digital_marketing: 0 },
      1: { engineering: 0, medical: 1, design: 1, business: 1, it: 0, government: 1, architecture: 0, data_science: 0, law: 1, psychology: 2, teaching: 1, arts: 1, aviation: 0, hospitality: 1, digital_marketing: 2 },
      2: { engineering: 1, medical: 1, design: 1, business: 2, it: 1, government: 1, architecture: 1, data_science: 1, law: 1, psychology: 2, teaching: 2, arts: 1, aviation: 1, hospitality: 2, digital_marketing: 2 },
      3: { engineering: 0, medical: 2, design: 2, business: 3, it: 1, government: 2, architecture: 0, data_science: 2, law: 2, psychology: 4, teaching: 3, arts: 2, aviation: 1, hospitality: 3, digital_marketing: 4 },
      4: { engineering: 0, medical: 2, design: 2, business: 3, it: 1, government: 2, architecture: 0, data_science: 2, law: 2, psychology: 5, teaching: 4, arts: 2, aviation: 1, hospitality: 3, digital_marketing: 5 }
    }
  },
  {
    question: "I prefer working independently and focusing deeply on my tasks.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 1, design: 0, business: 1, it: 0, government: 0, architecture: 0, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 0, hospitality: 1, digital_marketing: 0 },
      1: { engineering: 1, medical: 1, design: 1, business: 1, it: 1, government: 1, architecture: 1, data_science: 1, law: 2, psychology: 1, teaching: 0, arts: 2, aviation: 1, hospitality: 0, digital_marketing: 1 },
      2: { engineering: 2, medical: 2, design: 2, business: 2, it: 2, government: 2, architecture: 2, data_science: 2, law: 2, psychology: 2, teaching: 1, arts: 2, aviation: 2, hospitality: 1, digital_marketing: 2 },
      3: { engineering: 3, medical: 1, design: 3, business: 1, it: 4, government: 1, architecture: 3, data_science: 4, law: 3, psychology: 2, teaching: 1, arts: 4, aviation: 2, hospitality: 0, digital_marketing: 2 },
      4: { engineering: 4, medical: 1, design: 4, business: 1, it: 5, government: 1, architecture: 4, data_science: 5, law: 4, psychology: 2, teaching: 0, arts: 5, aviation: 2, hospitality: 0, digital_marketing: 2 }
    }
  },
  {
    question: "I am passionate about storytelling and communication through various media.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 0, design: 1, business: 0, it: 0, government: 0, architecture: 0, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 1, aviation: 0, hospitality: 0, digital_marketing: 1 },
      1: { engineering: 0, medical: 0, design: 2, business: 1, it: 0, government: 0, architecture: 1, data_science: 0, law: 1, psychology: 1, teaching: 1, arts: 2, aviation: 0, hospitality: 1, digital_marketing: 2 },
      2: { engineering: 1, medical: 1, design: 2, business: 2, it: 1, government: 1, architecture: 1, data_science: 1, law: 1, psychology: 2, teaching: 2, arts: 2, aviation: 1, hospitality: 1, digital_marketing: 2 },
      3: { engineering: 0, medical: 0, design: 4, business: 2, it: 1, government: 1, architecture: 2, data_science: 0, law: 2, psychology: 2, teaching: 3, arts: 4, aviation: 1, hospitality: 2, digital_marketing: 4 },
      4: { engineering: 0, medical: 0, design: 5, business: 2, it: 1, government: 1, architecture: 2, data_science: 0, law: 2, psychology: 2, teaching: 4, arts: 5, aviation: 1, hospitality: 2, digital_marketing: 5 }
    }
  },
  {
    question: "I enjoy working in fast-paced environments and handling multiple tasks.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "personality",
    type: "personality",
    weights: {
      0: { engineering: 0, medical: 1, design: 0, business: 0, it: 0, government: 0, architecture: 0, data_science: 0, law: 0, psychology: 0, teaching: 0, arts: 0, aviation: 1, hospitality: 0, digital_marketing: 0 },
      1: { engineering: 1, medical: 2, design: 1, business: 1, it: 1, government: 0, architecture: 1, data_science: 1, law: 1, psychology: 0, teaching: 1, arts: 1, aviation: 2, hospitality: 2, digital_marketing: 1 },
      2: { engineering: 2, medical: 2, design: 2, business: 2, it: 2, government: 1, architecture: 2, data_science: 2, law: 2, psychology: 1, teaching: 2, arts: 2, aviation: 2, hospitality: 2, digital_marketing: 2 },
      3: { engineering: 2, medical: 4, design: 2, business: 4, it: 3, government: 1, architecture: 2, data_science: 3, law: 2, psychology: 2, teaching: 2, arts: 2, aviation: 4, hospitality: 4, digital_marketing: 4 },
      4: { engineering: 2, medical: 5, design: 2, business: 5, it: 3, government: 1, architecture: 2, data_science: 3, law: 2, psychology: 2, teaching: 2, arts: 2, aviation: 5, hospitality: 5, digital_marketing: 5 }
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
