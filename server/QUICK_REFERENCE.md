# CareerViewX Backend - Quick Reference

## 📁 Complete Folder Structure

```
server/
│
├── config/
│   └── db.js                      # MongoDB connection
│
├── middleware/
│   └── authMiddleware.js          # JWT verification
│
├── models/
│   └── User.js                    # User schema (name, email, password, careerSuggestions)
│
├── routes/
│   ├── authRoutes.js              # /api/auth/signup, /login, /logout
│   └── profileRoutes.js           # /api/profile (GET, PUT)
│
├── .env                           # MONGO_URI, JWT_SECRET, PORT
├── server.js                      # Main entry point
├── package.json                   # Dependencies
└── BACKEND_README.md              # Full documentation
```

---

## 🔑 API Endpoints Summary

### Public Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login & get JWT token |
| POST | `/api/auth/logout` | Logout (removes token on frontend) |

### Protected Routes (Require JWT Token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get user profile |
| PUT | `/api/profile/career-suggestions` | Update career suggestions |

---

## 🔐 Authentication Flow

```
1. SIGNUP
   Frontend → POST /api/auth/signup → Password hashed → Saved to MongoDB
   
2. LOGIN
   Frontend → POST /api/auth/login → Password verified → JWT token returned
   
3. STORE TOKEN
   Frontend → localStorage.setItem('token', token)
   
4. ACCESS PROTECTED ROUTES
   Frontend → Add header: Authorization: Bearer <token>
   Backend → authMiddleware verifies token → Grants access
   
5. LOGOUT
   Frontend → localStorage.removeItem('token')
```

---

## 🌐 Frontend Integration (React)

### 1. Create API Service (`src/services/api.js`)

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

### 2. Login Function

```javascript
import API from './services/api';

const login = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data.user;
};
```

### 3. Get Profile Function

```javascript
const getProfile = async () => {
  const { data } = await API.get('/profile');
  return data;
};
```

### 4. Logout Function

```javascript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
```

### 5. Display User on Dashboard

```javascript
function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <h2>Career Suggestions:</h2>
      <ul>
        {user?.careerSuggestions.map((career, i) => (
          <li key={i}>{career}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🚀 How to Run

```bash
# 1. Install dependencies
cd server
npm install

# 2. Make sure MongoDB is running
mongod

# 3. Start server
npx nodemon server.js
```

Server runs on: **http://localhost:5000**

---

## ✅ What's Implemented

- ✅ User registration with bcrypt password hashing
- ✅ User login with JWT token generation
- ✅ Token verification middleware
- ✅ Protected profile routes
- ✅ Career suggestions field in User model
- ✅ Logout functionality
- ✅ MongoDB integration
- ✅ CORS enabled
- ✅ Proper folder structure
- ✅ Environment variables

---

## 📝 Environment Variables (.env)

```env
MONGO_URI=mongodb://127.0.0.1:27017/careerviewx
JWT_SECRET=careerviewx_super_secret
PORT=5000
```

---

## 🎯 Next: Connect Frontend

1. Create login/signup forms in React
2. Use the API service to call backend endpoints
3. Store token in localStorage after login
4. Display user name and career suggestions on dashboard
5. Protect routes using React Router
6. Remove token on logout

See **BACKEND_README.md** for detailed examples!
