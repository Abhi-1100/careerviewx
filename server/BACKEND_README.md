# CareerViewX Backend API

Complete MERN stack backend with JWT authentication, bcrypt password hashing, and MongoDB integration.

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── middleware/
│   └── authMiddleware.js     # JWT token verification middleware
├── models/
│   └── User.js               # User schema with career suggestions
├── routes/
│   ├── authRoutes.js         # Authentication routes (signup, login, logout)
│   └── profileRoutes.js      # Protected profile routes
├── .env                      # Environment variables
├── server.js                 # Main server file
└── package.json              # Dependencies

```

## 🚀 Features

✅ User Registration with password hashing (bcrypt)  
✅ User Login with JWT token generation  
✅ Protected routes with JWT verification  
✅ Profile management  
✅ Career suggestions field in user model  
✅ Logout functionality  
✅ MongoDB integration with Mongoose  
✅ CORS enabled for frontend integration  

---

## 📦 Installation

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/careerviewx
JWT_SECRET=careerviewx_super_secret
PORT=5000
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
mongod

# Or if using MongoDB as a service, it should auto-start
```

### 4. Run the Server

```bash
# Development mode with nodemon
npx nodemon server.js

# Or production mode
node server.js
```

Server will run on: **http://localhost:5000**

---

## 🔌 API Endpoints

### **Authentication Routes** (`/api/auth`)

#### 1. **Signup** - Register a new user
- **URL:** `POST /api/auth/signup`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "message": "User registered successfully"
}
```

#### 2. **Login** - Authenticate user and get token
- **URL:** `POST /api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "careerSuggestions": []
  }
}
```

#### 3. **Logout** - Logout user
- **URL:** `POST /api/auth/logout`
- **Response:**
```json
{
  "message": "Logged out successfully"
}
```
*Note: Token removal happens on the frontend. This endpoint is for consistency.*

---

### **Profile Routes** (`/api/profile`) - 🔒 Protected

#### 1. **Get Profile** - Fetch logged-in user's profile
- **URL:** `GET /api/profile`
- **Headers:**
```
Authorization: Bearer <your_jwt_token>
```
- **Response:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "careerSuggestions": ["Software Engineer", "Data Scientist"],
  "createdAt": "2026-02-11T15:54:59.000Z"
}
```

#### 2. **Update Career Suggestions** - Update user's career suggestions
- **URL:** `PUT /api/profile/career-suggestions`
- **Headers:**
```
Authorization: Bearer <your_jwt_token>
```
- **Body:**
```json
{
  "careerSuggestions": ["Software Engineer", "Data Scientist", "AI Researcher"]
}
```
- **Response:**
```json
{
  "message": "Career suggestions updated",
  "careerSuggestions": ["Software Engineer", "Data Scientist", "AI Researcher"]
}
```

---

## 🔐 Authentication Flow

### How JWT Works in This Project:

1. **User signs up** → Password is hashed with bcrypt → Stored in MongoDB
2. **User logs in** → Password verified → JWT token generated → Sent to frontend
3. **Frontend stores token** → localStorage or sessionStorage
4. **Protected requests** → Token sent in `Authorization: Bearer <token>` header
5. **Middleware verifies token** → Extracts user ID → Allows access
6. **Logout** → Frontend removes token from storage

---

## 🌐 Frontend Integration

### How to Connect Your React Frontend

#### 1. **Install Axios** (in your frontend folder)

```bash
npm install axios
```

#### 2. **Create API Service** (`src/services/api.js`)

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

#### 3. **Signup Example**

```javascript
import API from './services/api';

const handleSignup = async (name, email, password) => {
  try {
    const response = await API.post('/auth/signup', {
      name,
      email,
      password
    });
    console.log(response.data.message);
  } catch (error) {
    console.error(error.response.data.message);
  }
};
```

#### 4. **Login Example**

```javascript
import API from './services/api';

const handleLogin = async (email, password) => {
  try {
    const response = await API.post('/auth/login', {
      email,
      password
    });
    
    // Store token
    localStorage.setItem('token', response.data.token);
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    console.log('Logged in:', response.data.user);
  } catch (error) {
    console.error(error.response.data.message);
  }
};
```

#### 5. **Get Profile Example** (Protected Route)

```javascript
import API from './services/api';

const fetchProfile = async () => {
  try {
    const response = await API.get('/profile');
    console.log('Profile:', response.data);
  } catch (error) {
    console.error(error.response.data.message);
  }
};
```

#### 6. **Logout Example**

```javascript
import API from './services/api';

const handleLogout = async () => {
  try {
    await API.post('/auth/logout');
    
    // Remove token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    console.log('Logged out successfully');
  } catch (error) {
    console.error(error.response.data.message);
  }
};
```

#### 7. **Display User Name on Dashboard**

```javascript
import { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <h2>Career Suggestions:</h2>
      <ul>
        {user?.careerSuggestions.map((career, index) => (
          <li key={index}>{career}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🛡️ Security Features

- ✅ **Password Hashing:** bcrypt with salt rounds of 10
- ✅ **JWT Tokens:** Expire in 1 day
- ✅ **Protected Routes:** Middleware verifies token before access
- ✅ **CORS Enabled:** Allows frontend communication
- ✅ **Environment Variables:** Sensitive data in `.env`

---

## 📝 User Model Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  careerSuggestions: [String] (default: []),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## 🧪 Testing the API

### Using Postman or Thunder Client:

1. **Signup:**
   - POST `http://localhost:5000/api/auth/signup`
   - Body: `{ "name": "Test", "email": "test@test.com", "password": "123456" }`

2. **Login:**
   - POST `http://localhost:5000/api/auth/login`
   - Body: `{ "email": "test@test.com", "password": "123456" }`
   - Copy the `token` from response

3. **Get Profile:**
   - GET `http://localhost:5000/api/profile`
   - Headers: `Authorization: Bearer <paste_token_here>`

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running (`mongod` command)

### JWT Token Invalid
```
{ "message": "Token is not valid" }
```
**Solution:** Token might be expired or malformed. Login again to get a new token.

### CORS Error on Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** CORS is already enabled in `server.js`. Make sure you're using the correct backend URL.

---

## 📚 Dependencies

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.2.0",
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.2.4"
}
```

---

## 🎯 Next Steps

1. ✅ Backend is complete and running
2. 🔄 Connect your React frontend using the examples above
3. 🎨 Create login/signup forms in React
4. 📊 Build dashboard to display user name and career suggestions
5. 🔐 Implement protected routes in React Router
6. 🚀 Deploy backend to Render/Railway/Heroku
7. 🌐 Deploy frontend to Vercel/Netlify

---

## 📞 Support

If you encounter any issues, check:
- MongoDB is running
- `.env` file is configured correctly
- All dependencies are installed
- Port 5000 is not in use

---

**Happy Coding! 🚀**
