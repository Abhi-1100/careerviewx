# CareerViewX - Backend Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     REACT FRONTEND                          │
│  (Login, Signup, Dashboard, Profile Pages)                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP Requests
                     │ Authorization: Bearer <JWT_TOKEN>
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   EXPRESS BACKEND                           │
│                   (Port 5000)                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  MIDDLEWARE                                         │   │
│  │  • CORS (Cross-Origin Resource Sharing)            │   │
│  │  • express.json() (Body Parser)                    │   │
│  │  • authMiddleware (JWT Verification)               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ROUTES                                             │   │
│  │                                                     │   │
│  │  📂 /api/auth (Public)                             │   │
│  │     • POST /signup   → Register user               │   │
│  │     • POST /login    → Authenticate & get token    │   │
│  │     • POST /logout   → Logout user                 │   │
│  │                                                     │   │
│  │  📂 /api/profile (Protected - Requires JWT)       │   │
│  │     • GET  /         → Get user profile            │   │
│  │     • PUT  /career-suggestions → Update careers    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  MODELS                                             │   │
│  │                                                     │   │
│  │  👤 User Model                                      │   │
│  │     • name: String                                  │   │
│  │     • email: String (unique)                        │   │
│  │     • password: String (bcrypt hashed)              │   │
│  │     • careerSuggestions: [String]                   │   │
│  │     • timestamps: createdAt, updatedAt              │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Mongoose ODM
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  MONGODB DATABASE                           │
│              mongodb://127.0.0.1:27017                      │
│                                                             │
│  📊 Collection: users                                       │
│     • _id (ObjectId)                                        │
│     • name                                                  │
│     • email                                                 │
│     • password (hashed)                                     │
│     • careerSuggestions []                                  │
│     • createdAt                                             │
│     • updatedAt                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
┌──────────────┐
│   SIGNUP     │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│ 1. User sends: { name, email, password }               │
│ 2. Backend checks if email exists                      │
│ 3. Password hashed with bcrypt (10 salt rounds)        │
│ 4. User saved to MongoDB                               │
│ 5. Response: "User registered successfully"            │
└─────────────────────────────────────────────────────────┘

┌──────────────┐
│    LOGIN     │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│ 1. User sends: { email, password }                     │
│ 2. Backend finds user by email                         │
│ 3. bcrypt.compare(password, hashedPassword)            │
│ 4. JWT token generated with user._id                   │
│ 5. Response: { token, user: { name, email, careers } } │
└─────────────────────────────────────────────────────────┘

┌──────────────┐
│   FRONTEND   │
│ STORES TOKEN │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│ localStorage.setItem('token', token)                   │
│ localStorage.setItem('user', JSON.stringify(user))     │
└─────────────────────────────────────────────────────────┘

┌──────────────────┐
│ PROTECTED ROUTES │
└──────┬───────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│ 1. Frontend adds header: Authorization: Bearer <token> │
│ 2. authMiddleware extracts token                       │
│ 3. jwt.verify(token, JWT_SECRET)                       │
│ 4. Decoded user ID attached to req.userId              │
│ 5. Route handler accesses req.userId                   │
│ 6. User data fetched and returned                      │
└─────────────────────────────────────────────────────────┘

┌──────────────┐
│   LOGOUT     │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│ 1. Frontend calls /api/auth/logout (optional)          │
│ 2. localStorage.removeItem('token')                    │
│ 3. localStorage.removeItem('user')                     │
│ 4. User redirected to login page                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

```
server/
│
├── config/
│   └── db.js                          # MongoDB connection logic
│
├── middleware/
│   └── authMiddleware.js              # JWT token verification
│
├── models/
│   └── User.js                        # Mongoose User schema
│
├── routes/
│   ├── authRoutes.js                  # Signup, Login, Logout
│   └── profileRoutes.js               # Get/Update profile (protected)
│
├── .env                               # Environment variables
├── .env.example                       # Example env file
├── server.js                          # Main Express app
├── package.json                       # Dependencies
│
├── BACKEND_README.md                  # Full documentation
├── QUICK_REFERENCE.md                 # Quick guide
├── ARCHITECTURE.md                    # This file
└── CareerViewX_API.postman_collection.json  # API testing
```

---

## 🔄 Request/Response Flow Example

### Example: User Login

```
1. FRONTEND (React)
   ↓
   POST http://localhost:5000/api/auth/login
   Body: { "email": "john@example.com", "password": "password123" }
   
2. BACKEND (Express)
   ↓
   authRoutes.js → POST /login handler
   ↓
   User.findOne({ email: "john@example.com" })
   ↓
   bcrypt.compare("password123", hashedPasswordFromDB)
   ↓
   jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" })
   ↓
   Response: {
     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     user: {
       name: "John Doe",
       email: "john@example.com",
       careerSuggestions: ["Software Engineer"]
     }
   }

3. FRONTEND (React)
   ↓
   localStorage.setItem('token', response.data.token)
   localStorage.setItem('user', JSON.stringify(response.data.user))
   ↓
   Navigate to Dashboard
```

### Example: Get Profile (Protected)

```
1. FRONTEND (React)
   ↓
   GET http://localhost:5000/api/profile
   Headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
   
2. BACKEND (Express)
   ↓
   authMiddleware extracts token from header
   ↓
   jwt.verify(token, JWT_SECRET)
   ↓
   decoded = { id: "507f1f77bcf86cd799439011" }
   ↓
   req.userId = decoded.id
   ↓
   profileRoutes.js → GET / handler
   ↓
   User.findById(req.userId).select("-password")
   ↓
   Response: {
     name: "John Doe",
     email: "john@example.com",
     careerSuggestions: ["Software Engineer", "Data Scientist"],
     createdAt: "2026-02-11T15:54:59.000Z"
   }

3. FRONTEND (React)
   ↓
   Display user data on profile page
```

---

## 🛡️ Security Features

| Feature | Implementation | Purpose |
|---------|---------------|---------|
| **Password Hashing** | bcrypt with 10 salt rounds | Secure password storage |
| **JWT Tokens** | jsonwebtoken, expires in 1 day | Stateless authentication |
| **Token Verification** | authMiddleware | Protect routes |
| **CORS** | cors package | Allow frontend communication |
| **Environment Variables** | dotenv | Hide sensitive data |
| **Password Exclusion** | .select("-password") | Never send passwords to frontend |

---

## 🚀 Deployment Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use MongoDB Atlas for production database
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Add input validation
- [ ] Add error logging
- [ ] Set up CORS whitelist
- [ ] Add helmet.js for security headers
- [ ] Set up environment-specific configs

---

## 📊 Database Schema

```javascript
User {
  _id: ObjectId,                    // Auto-generated by MongoDB
  name: String,                     // User's full name
  email: String,                    // Unique email address
  password: String,                 // Bcrypt hashed password
  careerSuggestions: [String],      // Array of career suggestions
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-updated timestamp
}
```

---

## 🎯 API Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

### Login Response
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "name": "User Name",
    "email": "user@example.com",
    "careerSuggestions": ["Career 1", "Career 2"]
  }
}
```

---

**Built with ❤️ using MERN Stack**
