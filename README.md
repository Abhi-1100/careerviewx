# CareerViewX - AI-Powered Career Guidance Platform

A full-stack MERN application that helps students discover their ideal career paths through intelligent assessments and personalized recommendations.

## 🎯 Features

- **AI-Powered Assessments**: Multi-category assessment system (Logical, Creative, Science, Business, Social)
- **Personalized Career Recommendations**: Get top 3 career matches based on your assessment
- **Comprehensive Career Database**: 15+ career paths with detailed roadmaps, exam requirements, and salary ranges
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Interactive Dashboard**: Track your progress and career insights
- **Cloud Database**: MongoDB Atlas for scalable, cloud-based data storage

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

Create `server/.env` file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/careerviewx
JWT_SECRET=your_secure_random_secret_key_here
PORT=5000
```

### 3. Seed the Database

```bash
cd server
node seeds/careers.js
node seeds/questions.js
cd ..
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
node server.js
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🛠️ Technology Stack

### Frontend
- React 19.2.3
- React Router 7.12.0
- Axios 1.13.5
- Tailwind CSS 3.4.19
- Lucide React (Icons)

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)

---

## 📁 Project Structure

```
careerviewx/
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── contexts/           # React Context (Auth)
│   └── Services/           # API services
├── server/                 # Backend Node.js app
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── seeds/              # Database seeders
└── docs/                   # Documentation
```

---

## 📚 Documentation

- **[Setup Guide](docs/SETUP_GUIDE.md)** - Detailed installation steps
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Full Render + Vercel deployment journey, fixes, and final config
- **[API Documentation](docs/API_REFERENCE.md)** - Complete API reference
- **[Database Guide](docs/DATABASE.md)** - MongoDB setup and schema

---

## 🎨 Available Career Paths

Engineering • Medical • Design • Business • Law • Teaching • Arts • Science Research • Agriculture • Defense • Media & Journalism • Social Work • Sports • Aviation • Hospitality

---

## 🔧 Development Commands

```bash
# Frontend
npm start              # Start dev server
npm run build          # Build for production

# Backend (in server/)
node server.js         # Start backend
node dbHelper.js       # Check database status
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using the MERN Stack**
