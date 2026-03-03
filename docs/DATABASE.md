# CareerViewX Database Guide

Complete MongoDB database schema and management guide.

---

## 🗄️ Database Overview

**Database Name**: `careerviewx`

**Collections**:
1. `users` - User accounts and authentication
2. `careers` - Career path information
3. `questions` - Assessment questions

---

## Collections Schema

### 1. Users Collection

Stores user account information and assessment results.

**Schema**:
```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
    // Stored as bcrypt hash
  },
  careerSuggestions: {
    type: [String],
    default: []
    // Example: ["engineering", "design", "business"]
  },
  assessmentCompleted: {
    type: Boolean,
    default: false
  },
  assessmentScores: {
    type: Object,
   default: {}
    // Example: { logical: 85, creative: 72, science: 90 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `email` (unique)

**Example Document**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$N9qo8uL.../hashed...",
  "careerSuggestions": ["engineering", "design", "business"],
  "assessmentCompleted": true,
  "assessmentScores": {
    "logical": 90,
    "creative": 75,
    "science": 85,
    "business": 70,
    "social": 65
  },
  "createdAt": "2026-03-02T10:00:00.000Z"
}
```

---

### 2. Careers Collection

Stores all career path information.

**Schema**:
```javascript
{
  careerName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
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
    default: []
  },
  roadmap: {
    type: [String],
    required: true
  },
  salaryRange: {
    type: String,
    required: true
  }
}
```

**Example Document**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "careerName": "engineering",
  "description": "Engineering is a diverse field where professionals use scientific and mathematical principles...",
  "skillsRequired": [
    "Strong analytical and problem-solving skills",
    "Mathematics and physics knowledge",
    "CAD/Technical design software proficiency",
    "Programming (for software engineering)"
  ],
  "exams": [
    "JEE Main",
    "JEE Advanced",
    "GATE",
    "BITSAT"
  ],
  "roadmap": [
    "Complete 12th with Physics, Chemistry, Mathematics",
    "Prepare for entrance exams (JEE Main/Advanced)",
    "Pursue 4-year BTech/Engineering degree",
    "Gain practical experience through internships",
    "Specialize in a branch: Civil, Mechanical, Electrical, Software, etc."
  ],
  "salaryRange": "₹5-15 LPA (entry) to ₹30+ LPA with experience"
}
```

**Available Careers** (15 total):
- engineering
- medical
- design
- business
- law
- teaching
- arts
- science
- agriculture
- defense
- media
- social_work
- sports
- aviation
- hospitality

---

### 3. Questions Collection

Stores assessment questions for career evaluation.

**Schema**:
```javascript
{
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    // Only for MCQ questions
  },
  correctAnswer: {
    type: String,
    // Only for MCQ questions
  },
  category: {
    type: String,
    required: true,
    enum: ['logical', 'creative', 'science', 'business', 'social']
  },
  type: {
    type: String,
    required: true,
    enum: ['mcq', 'text']
  }
}
```

**Question Categories**:
- `logical` - Logical reasoning and problem-solving
- `creative` - Creative thinking and innovation
- `science` - Scientific aptitude
- `business` - Business acumen
- `social` - Social awareness and empathy

**Question Types**:
- `mcq` - Multiple choice questions with options
- `text` - Open-ended text responses

**Example MCQ Document**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "question": "If all roses are flowers and all flowers fade, what can be concluded?",
  "options": [
    "Roses fade",
    "Roses don't fade",
    "Some roses fade",
    "No roses fade"
  ],
  "correctAnswer": "Roses fade",
  "category": "logical",
  "type": "mcq"
}
```

**Example Text Document**:
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "question": "Describe your approach to solving complex problems.",
  "category": "creative",
  "type": "text"
}
```

**Question Distribution**:
- Logical: ~20 questions
- Creative: ~20 questions
- Science: ~15 questions
- Business: ~15 questions
- Social: ~15 questions
- **Total**: 86 questions

---

## Database Operations

### Seeding the Database

To populate the database with initial data:

```bash
cd server

# Seed careers (15 documents)
node seeds/careers.js

# Seed questions (86 documents)
node seeds/questions.js
```

### Viewing Database Contents

**Method 1: MongoDB Compass**
1. Open MongoDB Compass
2. Connect using your connection string
3. Navigate to `careerviewx` database
4. Browse collections

**Method 2: Using Helper Script**
```bash
node server/dbHelper.js
```

Output:
```
✅ Connected to MongoDB Atlas
📦 Database: careerviewx
🌐 Host: cluster.mongodb.net

--- Available Collections ---
1. questions
2. users
3. careers

--- Document Counts ---
questions: 86 documents
users: 5 documents
careers: 15 documents
```

**Method 3: MongoDB Shell**
```bash
mongosh "your_connection_string"

use careerviewx
show collections
db.users.countDocuments()
db.careers.find().pretty()
```

---

## Common Queries

### Find User by Email
```javascript
db.users.findOne({ email: "john@example.com" })
```

### Get All Engineering Questions
```javascript
db.questions.find({ category: "science" })
```

### Update User Career Suggestions
```javascript
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { careerSuggestions: ["engineering", "design"] } }
)
```

### Get Career Details
```javascript
db.careers.findOne({ careerName: "engineering" })
```

### Count Questions by Category
```javascript
db.questions.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])
```

---

## Backup and Restore

### Backup Database

**Using mongodump** (for local MongoDB):
```bash
mongodump --db careerviewx --out ./backup
```

**Using MongoDB Atlas**:
1. Go to your cluster in Atlas
2. Click "..." menu
3. Select "Backup"
4. Configure backup schedule

### Restore Database

**Using mongorestore**:
```bash
mongorestore --db careerviewx ./backup/careerviewx
```

---

## Database Maintenance

### Clear All Data

```javascript
// Delete all users
db.users.deleteMany({})

// Delete all careers
db.careers.deleteMany({})

// Delete all questions
db.questions.deleteMany({})
```

### Re-seed Database

```bash
cd server
node seeds/careers.js
node seeds/questions.js
```

---

## Security Best Practices

1. **Never commit .env files** - Keeps credentials secure
2. **Use strong passwords** - For database users
3. **Whitelist specific IPs** - In production (not 0.0.0.0/0)
4. **Enable authentication** - Always use authenticated connections
5. **Regular backups** - Schedule automated backups
6. **Monitor access** - Review database access logs

---

## Connection String Format

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?options
```

**Components**:
- `username` - Database user
- `password` - User password
- `cluster` - Your Atlas cluster URL
- `database` - Database name (`careerviewx`)
- `options` - Query parameters (retryWrites, w=majority, etc.)

---

## Troubleshooting

### Connection Issues

**Problem**: Cannot connect to database

**Solutions**:
1. Check internet connection
2. Verify cluster is running in Atlas
3. Check IP whitelist
4. Verify connection string format
5. Ensure password is URL-encoded

### Authentication Failed

**Problem**: Authentication failed error

**Solutions**:
1. Verify username and password
2. Check database user permissions
3. Ensure user has correct database access

### Collection Not Found

**Problem**: Collection doesn't exist

**Solutions**:
1. Run seed scripts
2. Check database name in connection string
3. Verify you're connected to correct cluster

---

## Migration Guide

If you need to migrate from local MongoDB to Atlas:

1. Export local data:
```bash
mongoexport --db careerviewx --collection users --out users.json
mongoexport --db careerviewx --collection careers --out careers.json
mongoexport --db careerviewx --collection questions --out questions.json
```

2. Import to Atlas:
```bash
mongoimport --uri "mongodb+srv://..." --collection users --file users.json
mongoimport --uri "mongodb+srv://..." --collection careers --file careers.json
mongoimport --uri "mongodb+srv://..." --collection questions --file questions.json
```

---

For more information:
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
