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
  },
  {
    careerName: "architecture",
    description: "Architects design buildings and structures that combine functionality, aesthetics, sustainability, and safety. They work on residential, commercial, and public projects, creating spaces that improve people's lives. Architecture blends creativity with technical expertise and understanding of materials, structures, and environmental considerations.",
    skillsRequired: [
      "Creative and spatial thinking",
      "Technical drawing and CAD software skills (AutoCAD, Revit, SketchUp)",
      "Knowledge of building codes and regulations",
      "Strong visualization abilities",
      "Understanding of structural engineering principles",
      "Project management",
      "Sustainability and environmental awareness",
      "Communication and client management"
    ],
    exams: [
      "NATA (National Aptitude Test in Architecture)",
      "JEE Main Paper 2 (B.Arch)",
      "State-level architecture entrance exams"
    ],
    roadmap: [
      "Complete 12th with Physics, Chemistry, Mathematics",
      "Take NATA or JEE Main Paper 2",
      "Pursue 5-year B.Arch degree",
      "Complete mandatory internships",
      "Register with Council of Architecture",
      "Work in architectural firms or start own practice",
      "Consider specialization in landscape, urban design, sustainable architecture",
      "Pursue M.Arch for advanced specialization"
    ],
    salaryRange: "₹3-8 LPA (freshers to ₹30+ LPA for established architects)"
  },
  {
    careerName: "data_science",
    description: "Data Scientists analyze complex data sets to extract insights and drive decision-making. They use statistical methods, machine learning, and programming to solve business problems. This field is in high demand across industries like finance, healthcare, e-commerce, and technology.",
    skillsRequired: [
      "Programming (Python, R, SQL)",
      "Statistics and mathematics",
      "Machine learning and AI knowledge",
      "Data visualization (Tableau, Power BI)",
      "Problem-solving and analytical thinking",
      "Domain knowledge",
      "Communication of technical insights",
      "Big data technologies (Hadoop, Spark)"
    ],
    exams: [
      "No specific exam - portfolio and skills matter",
      "BTech entrance exams (JEE, BITSAT)",
      "Certification courses (Google, IBM, AWS)"
    ],
    roadmap: [
      "Complete 12th with Mathematics",
      "Pursue BTech (CS/IT) or BSc (Statistics/Mathematics)",
      "Learn programming (Python, R) and statistics",
      "Master machine learning and data analysis libraries",
      "Build portfolio with real-world projects",
      "Internships in analytics companies",
      "Start as Data Analyst or Junior Data Scientist",
      "Progress to Senior Data Scientist, ML Engineer, or AI Specialist"
    ],
    salaryRange: "₹8-15 LPA (freshers to ₹50+ LPA for experienced professionals)"
  },
  {
    careerName: "law",
    description: "Legal professionals advocate for justice, represent clients, and interpret laws. Lawyers work in various domains including corporate law, criminal law, civil litigation, intellectual property, and more. This profession offers opportunities in private practice, corporate legal departments, judiciary, and public service.",
    skillsRequired: [
      "Strong analytical and logical reasoning",
      "Excellent written and oral communication",
      "Research skills",
      "Attention to detail",
      "Ethical values and integrity",
      "Negotiation and persuasion",
      "Time management",
      "Understanding of legal procedures and precedents"
    ],
    exams: [
      "CLAT (Common Law Admission Test)",
      "AILET (for National Law University Delhi)",
      "LSAT India",
      "State-level law entrance exams",
      "Judicial Services Examination (for judges)"
    ],
    roadmap: [
      "Complete 12th with any stream",
      "Prepare for CLAT or other law entrance exams",
      "Pursue 5-year integrated BA LLB or 3-year LLB after graduation",
      "Complete internships with law firms or judges",
      "Clear Bar Council examination and enroll",
      "Start practice or join law firm",
      "Specialize in specific legal domain",
      "Can pursue judiciary, corporate law, or independent practice"
    ],
    salaryRange: "₹3-10 LPA (freshers to ₹50+ LPA for senior lawyers and partners)"
  },
  {
    careerName: "psychology",
    description: "Psychologists study human behavior and mental processes to help people improve their lives. This field includes clinical psychology, counseling, organizational psychology, educational psychology, and research. Psychologists work in hospitals, schools, corporations, private practice, and research institutions.",
    skillsRequired: [
      "Empathy and active listening",
      "Understanding of human behavior",
      "Research and analytical skills",
      "Communication and counseling techniques",
      "Ethical conduct and confidentiality",
      "Patience and emotional stability",
      "Cultural sensitivity",
      "Problem-solving abilities"
    ],
    exams: [
      "University entrance exams for BA/BSc Psychology",
      "NET/JRF for research and teaching",
      "M.Phil entrance exams",
      "RCI (Rehabilitation Council of India) certification"
    ],
    roadmap: [
      "Complete 12th with any stream (Science/Arts/Commerce)",
      "Pursue BA/BSc in Psychology (3 years)",
      "Complete MA/MSc in Psychology (2 years)",
      "Specialize through M.Phil in Clinical Psychology",
      "Complete mandatory internships",
      "Register with RCI for clinical practice",
      "Work in hospitals, schools, NGOs, or start private practice",
      "Can pursue PhD for research and teaching careers"
    ],
    salaryRange: "₹3-8 LPA (freshers to ₹20+ LPA for established practitioners)"
  },
  {
    careerName: "teaching",
    description: "Educators shape future generations by imparting knowledge and skills. Teachers work at various levels from primary to higher education, specializing in different subjects. This profession offers the satisfaction of making a lasting impact on students' lives and contributing to society's development.",
    skillsRequired: [
      "Subject matter expertise",
      "Communication and presentation skills",
      "Patience and understanding",
      "Classroom management",
      "Creativity in lesson planning",
      "Empathy and mentoring abilities",
      "Adaptability to different learning styles",
      "Technology integration in teaching"
    ],
    exams: [
      "CTET (Central Teacher Eligibility Test)",
      "State TETs",
      "NET/SET for college professors",
      "B.Ed entrance exams",
      "UPSC for KVS/NVS recruitment"
    ],
    roadmap: [
      "Complete 12th and graduate in chosen subject",
      "Pursue B.Ed (2 years) or integrated BA B.Ed",
      "Clear CTET/TET for school teaching",
      "Apply to schools (government or private)",
      "For college teaching: Complete M.Phil/PhD and clear NET",
      "Gain experience and professional development",
      "Can specialize in educational administration",
      "Progress to senior positions like Principal or Professor"
    ],
    salaryRange: "₹3-6 LPA (school teachers to ₹10-20 LPA for college professors)"
  },
  {
    careerName: "digital_marketing",
    description: "Digital marketers promote brands, products, and services through online channels. This dynamic field includes SEO, social media marketing, content marketing, email marketing, and analytics. Digital marketing professionals help businesses grow their online presence and reach target audiences effectively.",
    skillsRequired: [
      "Understanding of digital platforms",
      "Content creation and copywriting",
      "SEO and SEM knowledge",
      "Social media management",
      "Data analytics and interpretation",
      "Creativity and innovation",
      "Communication skills",
      "Marketing automation tools"
    ],
    exams: [
      "No specific exam - certifications matter",
      "Google Ads Certification",
      "Google Analytics Certification",
      "HubSpot Content Marketing",
      "Facebook Blueprint Certification"
    ],
    roadmap: [
      "Complete 12th and pursue any bachelor's degree",
      "Learn digital marketing through courses (online/offline)",
      "Obtain industry certifications (Google, HubSpot, etc.)",
      "Create portfolio showcasing campaigns",
      "Start with internships in marketing agencies",
      "Begin as Digital Marketing Executive",
      "Specialize in SEO, SEM, Social Media, or Content",
      "Progress to Manager, Strategy roles, or start agency"
    ],
    salaryRange: "₹3-7 LPA (freshers to ₹25+ LPA for experienced professionals)"
  },
  {
    careerName: "arts",
    description: "Arts and Media professionals work in journalism, film, photography, writing, performing arts, and creative industries. They tell stories, create content, and express ideas through various artistic mediums. This field offers diverse opportunities in media houses, production companies, publishing, and freelance work.",
    skillsRequired: [
      "Creativity and artistic expression",
      "Strong communication skills",
      "Storytelling abilities",
      "Technical skills (camera, editing software, etc.)",
      "Cultural awareness",
      "Networking and collaboration",
      "Research and investigation (for journalism)",
      "Adaptability and resilience"
    ],
    exams: [
      "University entrance exams for Mass Communication",
      "IIMC entrance exam",
      "FTII entrance for film studies",
      "Portfolio-based admissions for fine arts"
    ],
    roadmap: [
      "Complete 12th with any stream",
      "Pursue degree in Journalism, Mass Communication, or Fine Arts",
      "Build portfolio of creative work",
      "Internships with media houses, production companies, or studios",
      "Start as junior journalist, assistant, or freelancer",
      "Specialize in specific medium (print, digital, video, photography)",
      "Build network and reputation in industry",
      "Progress to senior positions or establish independent practice"
    ],
    salaryRange: "₹2-6 LPA (freshers to ₹20+ LPA for established professionals)"
  },
  {
    careerName: "aviation",
    description: "Aviation professionals work in various roles including pilots, air traffic controllers, aircraft maintenance engineers, and aviation management. This exciting field offers opportunities to work in airlines, airports, aircraft manufacturing, and regulatory bodies. It combines technical expertise with operational excellence.",
    skillsRequired: [
      "Technical knowledge of aircraft systems",
      "Excellent spatial awareness",
      "Quick decision-making under pressure",
      "Communication skills",
      "Attention to detail and safety",
      "Physical and mental fitness",
      "Problem-solving abilities",
      "Teamwork and coordination"
    ],
    exams: [
      "CPL (Commercial Pilot License) exams",
      "DGCA exams for pilots and engineers",
      "AME CET (Aircraft Maintenance Engineering)",
      "University entrance for aeronautical engineering",
      "Air Traffic Controller exams"
    ],
    roadmap: [
      "Complete 12th with Physics, Chemistry, Mathematics",
      "For Pilot: Join flying school, complete CPL training",
      "For AME: Pursue 4-year AME course and DGCA license",
      "For Engineering: BTech in Aeronautical/Aerospace Engineering",
      "Complete required flying hours/practical training",
      "Obtain necessary licenses and certifications",
      "Join airlines, airports, or aircraft companies",
      "Progress through experience and additional type ratings"
    ],
    salaryRange: "₹6-12 LPA (freshers to ₹80+ LPA for experienced pilots)"
  },
  {
    careerName: "hospitality",
    description: "Hospitality professionals manage hotels, restaurants, events, and tourism services. This people-centric industry focuses on providing excellent guest experiences. Career opportunities exist in hotel management, culinary arts, event management, cruise lines, and tourism. It's a dynamic field with global opportunities.",
    skillsRequired: [
      "Customer service excellence",
      "Communication and interpersonal skills",
      "Leadership and team management",
      "Problem-solving and crisis management",
      "Attention to detail",
      "Cultural sensitivity",
      "Multitasking abilities",
      "Financial management"
    ],
    exams: [
      "NCHMCT JEE (for hotel management)",
      "State-level hotel management entrance exams",
      "University entrance tests",
      "IHM entrance exams"
    ],
    roadmap: [
      "Complete 12th with any stream",
      "Prepare for hotel management entrance exams",
      "Pursue degree/diploma in Hotel Management (3-4 years)",
      "Complete mandatory industry training",
      "Start in entry-level positions (Front Desk, F&B)",
      "Gain experience across departments",
      "Specialize in area of interest",
      "Progress to managerial and leadership roles"
    ],
    salaryRange: "₹2.5-6 LPA (freshers to ₹25+ LPA for hotel/resort managers)"
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
