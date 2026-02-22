# CareerViewX Assessment Module - Quick Start Guide

## What's Been Implemented

### Backend (Node.js + Express + MongoDB)

✅ **Models Created:**
- `server/models/Question.js` - Stores MCQ and personality questions
- `server/models/Career.js` - Stores career pathway information
- `server/models/User.js` - Updated with assessment fields

✅ **Seed Files Created:**
- `server/seeds/questions.js` - 20 assessment questions (already seeded ✓)
- `server/seeds/careers.js` - 6 career pathways (already seeded ✓)

✅ **API Routes Created:**
- `server/routes/assessment.js`
  - `GET /api/assessment/questions` - Fetch 20 random questions
  - `POST /api/assessment/submit` - Submit answers and get recommendation
- `server/routes/careers.js`
  - `GET /api/careers/:careerName` - Get career details by name

✅ **Server Updated:**
- `server/server.js` - Routes registered
- `server/package.json` - Seed scripts added

### Frontend (React + Tailwind CSS)

✅ **Pages Created:**
- `src/pages/Assessment.jsx` - Full assessment interface with 20 questions
- `src/pages/CareerResult.jsx` - Career details and recommendations display

✅ **API Integration:**
- `src/Services/api.js` - New endpoint functions added
- `src/App.js` - Routes configured with ProtectedRoute wrapper

---

## How to Use

### 1. Start the Backend
```bash
cd server
npm install  # if needed
npm start    # or npm run dev
```
Server runs on `http://localhost:5000`

### 2. Start the Frontend
```bash
npm install  # if needed
npm start
```
Frontend runs on `http://localhost:3000`

### 3. In Browser
1. Create an account or login
2. Navigate to `/assessments` (or click Assessment in navigation)
3. Click "Start Assessment" button (in AssessmentsHub)
4. Take the 20-question assessment:
   - Answer questions by clicking options
   - Use Previous/Next to navigate
   - See progress bar at top
5. Click "Submit Assessment" on the final question
6. View your career recommendation with full details:
   - Skills required (as pills)
   - Career roadmap (numbered steps)
   - Entrance exams
   - Salary range
   - Book mentor session button

---

## Key Features

### Assessment Page (`/assessments/quest`)
- ✓ 20 random questions (logic, analytics, subjects, personality)
- ✓ Progress bar with percentages
- ✓ One question at a time
- ✓ Option selection highlighting
- ✓ Previous/Next navigation
- ✓ Auto-saving indicator
- ✓ Disabled submit until all answered
- ✓ Loading spinner during API calls
- ✓ Mobile responsive

### Career Result Page (`/assessments/result`)
- ✓ Career name and description (hero section)
- ✓ Required skills (pill badges)
- ✓ Step-by-step roadmap (numbered)
- ✓ Entrance exams (list)
- ✓ Salary range (highlighted)
- ✓ Book mentor session button
- ✓ Navigation back to take again or dashboard
- ✓ Error handling if no recommendation
- ✓ Mobile responsive

---

## Database Schema

### Question Collection
```
{
  _id: ObjectId,
  question: string,
  options: string[],
  correctAnswer: string (MCQ only),
  category: enum (logical|analytical|biology|commerce|creativity|personality),
  type: enum (mcq|personality),
  weights: object (personality only),
  createdAt: date,
  updatedAt: date
}
```

### Career Collection
```
{
  _id: ObjectId,
  careerName: string (unique, lowercase),
  description: string,
  skillsRequired: string[],
  exams: string[],
  roadmap: string[],
  salaryRange: string,
  createdAt: date,
  updatedAt: date
}
```

### User Collection (Updated)
```
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  password: string,
  education: string,
  stream: string,
  careerSuggestions: string[],
  recommendedCareer: string (NEW),
  assessmentScore: object (NEW),
  createdAt: date,
  updatedAt: date
}
```

---

## API Endpoints

### GET /api/assessment/questions
```
Headers: Authorization: Bearer <token>
Response:
{
  success: true,
  count: 20,
  questions: [
    {
      _id: "...",
      question: "...",
      options: ["opt1", "opt2", "opt3", "opt4"],
      category: "logical",
      type: "mcq",
      weights: null
    },
    ...
  ]
}
```

### POST /api/assessment/submit
```
Headers: Authorization: Bearer <token>
Body:
{
  answers: [
    { questionId: "...", selectedAnswer: "opt1", selectedAnswerIndex: 0 },
    ...
  ]
}
Response:
{
  success: true,
  recommendedCareer: "engineering",
  scores: {
    engineering: 45,
    medical: 15,
    design: 20,
    business: 28,
    it: 52,
    government: 18
  }
}
```

### GET /api/careers/:careerName
```
Headers: Authorization: Bearer <token>
Response:
{
  success: true,
  career: {
    _id: "...",
    careerName: "engineering",
    description: "...",
    skillsRequired: [...],
    exams: [...],
    roadmap: [...],
    salaryRange: "..."
  }
}
```

---

## Scoring Logic

### MCQ Questions (15 questions)
- Correct answer = 1 point in category
- Categories map to career scores:
  - Logical + Analytical → Engineering (2x), IT (2.5x)
  - Biology → Medical (3x)
  - Commerce → Business (2.5x), Government (1.5x)
  - Creativity → Design (3x)

### Personality Questions (5 questions)
- Each has weights for all career domains
- Selected option index (0-4) determines weight distribution
- Scores accumulate across personality questions

### Final Recommendation
- Highest scoring career domain is recommended

---

## Npm Scripts (Server)

```bash
# Run individual seeds
npm run seed:questions
npm run seed:careers

# Run all seeds at once
npm run seed:all
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Questions not loading | Run `npm run seed:questions` from server directory |
| Career not found | Run `npm run seed:careers` then refresh page |
| API errors | Check server is running on port 5000 |
| No assessments showing | Clear browser cache and localStorage |
| Login required | Ensure JWT token in localStorage with key "token" |

---

## File Structure

```
server/
├── models/
│   ├── User.js (*.js updated with assessment fields)
│   ├── Question.js (NEW)
│   └── Career.js (NEW)
├── routes/
│   ├── assessment.js (NEW)
│   └── careers.js (NEW)
├── seeds/
│   ├── questions.js (NEW)
│   └── careers.js (NEW)
├── server.js (*.js updated with new routes)
└── package.json (*.json updated with seed scripts)

src/
├── pages/
│   ├── Assessment.jsx (NEW)
│   └── CareerResult.jsx (NEW)
├── Services/
│   └── api.js (*.js updated with new endpoints)
├── App.js (*.js updated with new imports)
└── ASSESSMENT_MODULE.md (NEW - full documentation)

(*.js = already existed, NEW = created by this implementation)
```

---

## Next Steps

The module is fully functional! You can:
1. Test the assessment flow
2. Verify scores calculation
3. Add custom questions/careers via MongoDB directly
4. Implement "Book Mentor Session" functionality
5. Add assessment analytics
6. Create admin dashboard for content management

---

## Support

For detailed implementation information, see:
- `ASSESSMENT_MODULE.md` - Complete technical documentation
- `server/routes/assessment.js` - Assessment logic
- `src/pages/Assessment.jsx` - Frontend assessment component
- `src/pages/CareerResult.jsx` - Results display component

Happy assessing! 🚀
