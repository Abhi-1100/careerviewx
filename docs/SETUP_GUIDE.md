# CareerViewX Setup Guide

Complete step-by-step guide to set up CareerViewX on your local machine.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB Compass** (optional) - [Download here](https://www.mongodb.com/products/compass)

---

## 🌐 MongoDB Atlas Setup

CareerViewX uses MongoDB Atlas (cloud database). Follow these steps:

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with email or Google
3. Select **FREE** tier (M0 - FREE forever)

### 2. Create a Cluster

1. Click **"Create"** or **"Build a Database"**
2. Choose **M0 (Free tier)**
3. Select **Cloud Provider** and **Region** (choose closest to you)
4. Cluster Name: `careerviewx` (or any name)
5. Click **"Create Cluster"** (takes 1-3 minutes)

### 3. Create Database User

1. Go to **"Database Access"** (Security section in left sidebar)
2. Click **"Add New Database User"**
3. **Username**: `careerviewx_user` (or your choice)
4. **Password**: Click "Autogenerate" and **COPY IT** (save somewhere safe)
5. **Privileges**: Select "Atlas admin" or "Read and write to any database"
6. Click **"Add User"**

### 4. Whitelist IP Address

1. Go to **"Network Access"** (Security section)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - IP: `0.0.0.0/0`
4. Click **"Confirm"**

### 5. Get Connection String

1. Go to **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Drivers"**
4. Choose **Driver**: Node.js, **Version**: 4.1 or later
5. **Copy** the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```

6. **Replace** `<username>` and `<password>` with your credentials
7. **Add** database name before the query params:
   ```
   
   ```

---

## ⚙️ Project Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd careerviewx
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This will install all required packages including:
- React
- React Router
- Axios
- Tailwind CSS
- And more...

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

This installs backend packages:
- Express
- Mongoose
- JWT
- bcryptjs
- etc.

### Step 4: Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cd server
# Windows
New-Item -Path ".env" -ItemType File

# Mac/Linux
touch .env
```

Add the following content to `server/.env`:

```env
MONGO_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/careerviewx
JWT_SECRET=your_super_secret_random_string_here_make_it_long_and_complex
PORT=5000
```

**Important:**
- Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials
- Generate a secure `JWT_SECRET` (use a password generator or random string)
- Never commit `.env` to version control

### Step 5: Seed the Database

Populate your MongoDB Atlas database with initial data:

```bash
# Make sure you're in the server directory
cd server

# Seed careers data (15 career paths)
node seeds/careers.js

# Seed questions data (86 assessment questions)
node seeds/questions.js

cd ..
```

You should see success messages like:
```
✅ Successfully inserted 15 careers
✅ Successfully inserted 86 questions
```

---

## 🚀 Running the Application

You need to run both the backend and frontend servers.

### Option  1: Using Two Terminals (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd server
node server.js
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

**Terminal 2 - Frontend Server:**
```bash
# In the root directory
npm start
```

The React app should automatically open at `http://localhost:3000`

### Option 2: Using Background Process

**Windows PowerShell:**
```powershell
# Start backend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command cd server; node server.js"

# Start frontend
npm start
```

---

## ✅ Verify Installation

### 1. Check Backend

Open browser and go to: `http://localhost:5000`

You should see:
```json
{"message": "CareerViewX API is running"}
```

### 2. Check Frontend

Frontend should be running at: `http://localhost:3000`

### 3. Test API Endpoints

```bash
# Get all careers
curl http://localhost:5000/api/careers

# Get all questions
curl http://localhost:5000/api/assessment/questions
```

### 4. Verify Database (Optional)

Using MongoDB Compass:

1. Open MongoDB Compass
2. Paste your connection string
3. Connect
4. You should see:
   - Database: `careerviewx`
   - Collections: `careers`, `questions`, `users`

---

## 🔧 Troubleshooting

### Issue: MongoDB Connection Error

**Error**: `ECONNREFUSED` or `getaddrinfo ENOTFOUND`

**Solutions:**
1. Check internet connection
2. Verify MongoDB Atlas cluster is running
3. Check IP whitelist in MongoDB Atlas Network Access
4. Verify connection string in `.env` file
5. Ensure password doesn't contain special characters or encode them

### Issue: Port Already in Use

**Error**: `Port 3000 is already in use` or `Port 5000 is already in use`

**Windows Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Mac/Linux Solution:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# For port 5000
lsof -ti:5000 | xargs kill -9
```

### Issue: Dependencies Not Installing

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Do the same for server
cd server
rm -rf node_modules package-lock.json
npm install
```

### Issue: JWT Secret Not Working

**Solution:**
- Make sure `JWT_SECRET` is a long, random string
- No spaces or special characters that might break the `.env` parsing
- Example: `JWT_SECRET=myApp2024SecureRandomKeyWithNumbersAndLetters123`

---

## 📦 Production Build

### Build Frontend

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy Backend

Ensure your `.env` file is configured on your server with production MongoDB URI.

---

## 🎉 Success!

You should now have:
- ✅ MongoDB Atlas database configured
- ✅ Backend server running on port 5000
- ✅ Frontend server running on port 3000
- ✅ Database seeded with careers and questions

Visit `http://localhost:3000` to start using CareerViewX!

---

## 📚 Next Steps

- [API Reference](API_REFERENCE.md) - Learn about available API endpoints
- [Database Guide](DATABASE.md) - Understand the database schema
- Start building and testing features!

---

If you encounter any issues not covered here, please check the main [README.md](../README.md) or open an issue.
