const mongoose = require("mongoose");
require("dotenv").config();
const Career = require("../models/Career");

const careersData = [
  {
    careerName: "engineering",
    description: "Engineering is a diverse field where professionals use scientific and mathematical principles to design, build, and improve structures, machines, systems, and processes. Engineers solve real-world problems and drive technological innovation across various industries including civil, mechanical, electrical, software, and more.",
    skillsRequired: [
      "Strong analytical and problem-solving skills",
      "Mathematics and physics knowledge",
      "CAD/Technical design software proficiency",
      "Project management",
      "Communication skills",
      "Programming (for software engineering)"
    ],
    exams: [
      "JEE Main",
      "JEE Advanced",
      "GATE",
      "BITSAT",
      "VITEEE"
    ],
    roadmap: [
      "Complete 12th with Physics, Chemistry, Mathematics",
      "Prepare for entrance exams (JEE Main/Advanced)",
      "Pursue 4-year BTech/Engineering degree",
      "Gain practical experience through internships",
      "Specialize in a branch: Civil, Mechanical, Electrical, Software, Aerospace, etc.",
      "Consider professional certifications like PE (Professional Engineer)",
      "Pursue higher education (MTech, PhD) if interested in research"
    ],
    salaryRange: "₹5-15 LPA (entry level to ₹30+ LPA with experience)"
  },
  {
    careerName: "medical",
    description: "Medicine is a noble profession dedicated to diagnosing, treating, and preventing diseases. Medical professionals work to improve human health and save lives. This field includes various specializations such as general practice, surgery, pediatrics, psychiatry, and many others. Medical professionals can work in hospitals, clinics, research centers, or in public health.",
    skillsRequired: [
      "Strong foundation in Biology and Chemistry",
      "Attention to detail and precision",
      "Compassion and empathy",
      "Decision-making under pressure",
      "Communication and interpersonal skills",
      "Physical and mental stamina",
      "Continuous learning mindset"
    ],
    exams: [
      "NEET",
      "AIIMS",
      "JIPMER",
      "PG entrance exams (after graduation)",
      "State medical entrance exams"
    ],
    roadmap: [
      "Complete 12th with Biology, Chemistry, Physics",
      "Prepare for NEET exam (score required: typically 650+)",
      "Complete MBBS (5.5 years including internship)",
      "Register with Medical Council",
      "Work as a resident doctor in a hospital",
      "Pursue specialization (MD/MS) if desired",
      "Establish practice or work in hospitals/clinics"
    ],
    salaryRange: "₹3-8 LPA (MBBS freshers to ₹50+ LPA for experienced specialists)"
  },
  {
    careerName: "design",
    description: "Design professionals use creativity and technical skills to solve problems and create meaningful user experiences. This field encompasses graphic design, UX/UI design, industrial design, fashion design, and more. Designers work across industries including tech, fashion, advertising, product development, and entertainment.",
    skillsRequired: [
      "Creative thinking and artistic ability",
      "Proficiency in design software (Adobe Suite, Figma, etc.)",
      "Understanding of color theory and composition",
      "User empathy and research skills",
      "Communication and presentation abilities",
      "Problem-solving and innovation",
      "Attention to detail"
    ],
    exams: [
      "NATA (National Aptitude Test in Architecture)",
      "JEE Paper 2 (B.Arch)",
      "University entrance exams for design programs",
      "Portfolio-based admission for many institutes"
    ],
    roadmap: [
      "Complete 12th with any stream",
      "Build a strong portfolio of creative work",
      "Apply to design schools or fine arts colleges",
      "Pursue diploma/degree in Design (3-4 years)",
      "Master design tools and software",
      "Internships with design agencies/studios",
      "Build personal brand and freelance portfolio",
      "Specialize in UX/UI, Graphics, Product, Fashion, or other areas"
    ],
    salaryRange: "₹3-8 LPA (freshers to ₹25+ LPA for senior designers/design leads)"
  },
  {
    careerName: "business",
    description: "Business professionals analyze markets, develop strategies, and lead organizations to success. This field includes management, finance, marketing, entrepreneurship, and consulting. Business professionals work in various sectors and can build sustainable businesses or climb corporate hierarchies.",
    skillsRequired: [
      "Analytical and business acumen",
      "Strategic thinking",
      "Financial literacy and accounting knowledge",
      "Leadership and team management",
      "Negotiation skills",
      "Data analysis and interpretation",
      "Communication and persuasion",
      "Entrepreneurial mindset"
    ],
    exams: [
      "CAT (for MBA admission)",
      "GMAT (for international MBA)",
      "XAT, SNAP, MAT",
      "Commerce stream competitive exams",
      "UPSC (for IAS/IPS)"
    ],
    roadmap: [
      "Complete 12th (Commerce is preferred but not mandatory)",
      "Pursue Bachelor's in Commerce, Economics, or other field",
      "Gain 2-3 years of work experience",
      "Take CAT or similar entrance exam",
      "Complete MBA (2 years) from premiere institutes",
      "Join as Management Trainee in corporations",
      "Specialize in Finance, Marketing, HR, Operations, etc.",
      "Progress to senior positions or start own venture"
    ],
    salaryRange: "₹8-20 LPA (MBA freshers to ₹50+ LPA for C-level executives)"
  },
  {
    careerName: "it",
    description: "IT professionals develop, implement, and maintain software and technology systems. With the digital transformation happening globally, IT offers vast opportunities in software development, cybersecurity, cloud computing, artificial intelligence, and data science. IT professionals work across all industries and can have high earning potential.",
    skillsRequired: [
      "Programming languages (Python, Java, C++, JavaScript)",
      "Problem-solving and logical thinking",
      "System design and architecture knowledge",
      "Database management",
      "Understanding of data structures and algorithms",
      "Version control (Git)",
      "Continuous learning mindset",
      "Teamwork and communication"
    ],
    exams: [
      "JEE Main/Advanced (for BTech)",
      "GATE CS",
      "BITS entrance",
      "No specific exam needed - coding skills matter"
    ],
    roadmap: [
      "Complete 12th with Mathematics",
      "Pursue BTech in Computer Science (4 years)",
      "Learn programming languages and web technologies",
      "Complete projects and build GitHub portfolio",
      "Internships in software companies",
      "Start first job as Junior Developer/Associate",
      "Specialize in backend, frontend, full-stack, AI/ML, DevOps, etc.",
      "Progress to Senior Developer, Tech Lead, Architect, or Management roles"
    ],
    salaryRange: "₹6-12 LPA (freshers to ₹40+ LPA for senior engineers and leads)"
  },
  {
    careerName: "government",
    description: "Government service offers an opportunity to serve the nation and contribute to public welfare. Civil servants work in various departments, formulating policies, implementing programs, and ensuring good governance. This career path provides job security, social respect, and the satisfaction of serving society.",
    skillsRequired: [
      "General knowledge and current affairs awareness",
      "Analytical and reasoning abilities",
      "Communication skills",
      "Integrity and ethical values",
      "Problem-solving for public benefit",
      "Administrative skills",
      "Leadership and decision-making abilities",
      "Patience and perseverance"
    ],
    exams: [
      "UPSC Civil Services Examination (IAS/IPS/IFS)",
      "State Public Service Commission exams",
      "SSC CGL, SSC MTS",
      "GATE (for engineering/technical posts)",
      "Various department-specific exams"
    ],
    roadmap: [
      "Complete 12th and Bachelor's degree (any stream)",
      "Build strong general knowledge and current affairs awareness",
      "Prepare for UPSC or relevant service exams",
      "Clear prelims, mains, and interview rounds",
      "Complete foundation training",
      "Posted in various districts/states",
      "Progress through hierarchical positions",
      "Opportunity for specialization and deputation",
      "Can complete postings in 30+ years of service"
    ],
    salaryRange: "₹2-5 LPA (entry level as Assistant/Officer to ₹2+ lakhs per month for senior officers)"
  }
];

const seedCareers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/careerviewx");
    console.log("🏢 Connected to MongoDB");

    // Clear existing careers
    await Career.deleteMany({});
    console.log("🗑️  Cleared existing careers");

    // Insert new careers
    const result = await Career.insertMany(careersData);
    console.log(`✅ Successfully inserted ${result.length} careers`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error seeding careers:", error.message);
    process.exit(1);
  }
};

seedCareers();
