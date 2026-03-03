# CareerViewX API Reference

Complete API documentation for all endpoints.

**Base URL**: `http://localhost:5000`

---

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register New User

Create a new user account.

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (201 Created):
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors**:
- `400` - Email already exists
- `400` - Missing required fields

---

### Login

Authenticate existing user.

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (200 OK):
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "careerSuggestions": ["engineering", "design", "business"]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors**:
- `400` - Invalid credentials
- `400` - Missing email or password

---

### Get Current User

Get the authenticated user's information.

**Endpoint**: `GET /api/auth/me`

**Headers**: 
```http
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "careerSuggestions": ["engineering", "design"],
  "assessmentCompleted": true,
  "createdAt": "2026-03-02T10:30:00.000Z"
}
```

**Errors**:
- `401` - No token provided
- `401` - Invalid token

---

## Assessment Endpoints

### Get All Questions

Retrieve all assessment questions.

**Endpoint**: `GET /api/assessment/questions`

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "question": "If all roses are flowers and all flowers fade, what can be concluded?",
    "options": ["Roses fade", "Roses don't fade", "Some roses fade", "No roses fade"],
    "category": "logical",
    "type": "mcq"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "question": "Describe your approach to solving complex problems.",
    "category": "creative",
    "type": "text"
  }
]
```

**Note**: `correctAnswer` field is NOT returned for security.

---

### Submit Assessment

Submit user's assessment answers and get career recommendations.

**Endpoint**: `POST /api/assessment/submit`

**Headers**: 
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "answers": {
    "507f1f77bcf86cd799439011": "Roses fade",
    "507f1f77bcf86cd799439012": "My approach involves...",
    "507f1f77bcf86cd799439013": "42"
  }
}
```

**Response** (200 OK):
```json
{
  "message": "Assessment submitted successfully",
  "topCareers": [
    {
      "career": "engineering",
      "percentage": 85.5
    },
    {
      "career": "design",
      "percentage": 72.3
    },
    {
      "career": "business",
      "percentage": 68.9
    }
  ],
  "categoryScores": {
    "logical": 90,
    "creative": 75,
    "science": 80,
    "business": 70,
    "social": 65
  }
}
```

**Errors**:
- `401` - Unauthorized (no token)
- `400` - Invalid answers format

---

## Career Endpoints

### Get All Careers

Retrieve all available career paths.

**Endpoint**: `GET /api/careers`

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "careerName": "engineering",
    "description": "Engineering is a diverse field...",
    "skillsRequired": [
      "Strong analytical and problem-solving skills",
      "Mathematics and physics knowledge",
      "CAD/Technical design software proficiency"
    ],
    "exams": ["JEE Main", "JEE Advanced", "GATE"],
    "roadmap": [
      "Complete 12th with PCM",
      "Prepare for entrance exams",
      "Pursue 4-year BTech degree"
    ],
    "salaryRange": "₹5-15 LPA (entry) to ₹30+ LPA"
  }
]
```

---

### Get Career by Name

Retrieve specific career details.

**Endpoint**: `GET /api/careers/:careerName`

**Parameters**:
- `careerName` (string) - Name of the career (lowercase)

**Example**: `GET /api/careers/engineering`

**Response** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "careerName": "engineering",
  "description": "Engineering is a diverse field...",
  "skillsRequired": [...],
  "exams": [...],
  "roadmap": [...],
  "salaryRange": "₹5-15 LPA to ₹30+ LPA"
}
```

**Errors**:
- `404` - Career not found

---

## Profile Endpoints

### Get User Profile

Get authenticated user's profile.

**Endpoint**: `GET /api/profile`

**Headers**: 
```http
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "careerSuggestions": ["engineering", "design", "business"],
  "assessmentCompleted": true,
  "assessmentScores": {
    "logical": 90,
    "creative": 75,
    "science": 80
  },
  "createdAt": "2026-03-02T10:30:00.000Z"
}
```

**Errors**:
- `401` - Unauthorized

---

### Update Profile

Update user profile information.

**Endpoint**: `PUT /api/profile`

**Headers**: 
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response** (200 OK):
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "johnsmith@example.com"
  }
}
```

**Errors**:
- `401` - Unauthorized
- `400` - Email already in use

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---

## Error Response Format

All errors follow this format:

```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

---

## Rate Limiting

Currently, there are no rate limits. This may be added in future versions.

---

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

---

## Example Usage

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get careers
curl http://localhost:5000/api/careers

# Get profile (with token)
curl http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using JavaScript (Axios)

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Login
const login = async () => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email: 'john@example.com',
    password: 'pass123'
  });
  return response.data.token;
};

// Get careers with token
const getCareers = async (token) => {
  const response = await axios.get(`${API_URL}/api/careers`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
```

---

## Notes

- All dates are in ISO 8601 format
- Passwords are hashed using bcrypt (never stored in plain text)
- JWT tokens expire after 30 days
- All responses are in JSON format

---

For more information, see [Setup Guide](SETUP_GUIDE.md) or [Database Guide](DATABASE.md).
