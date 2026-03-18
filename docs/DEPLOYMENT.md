# CareerViewX Deployment Guide

This document captures the actual deployment journey for CareerViewX, including common failures and exact fixes.

---

## Project Overview

CareerViewX is a MERN stack application:
- Frontend: React (deployed on Vercel)
- Backend: Node.js and Express (deployed on Render)
- Database: MongoDB Atlas

Repository structure:

```
careerviewx/
├── frontend/
└── backend/
```

---

## Final Working Setup

| Setting | Value |
|---|---|
| Frontend URL | https://careerviewx.vercel.app |
| Backend URL | https://careerviewx.onrender.com |
| Database | MongoDB Atlas |
| Vercel Root Directory | frontend |
| Render Root Directory | backend |
| Render Build Command | npm install |
| Render Start Command | npm run start |

---

## Backend Deployment on Render

### 1. Create Render Web Service

1. Open Render Dashboard.
2. Click New + and choose Web Service.
3. Connect GitHub repository.
4. Select the repository.

### 2. Configure Render Service

Use these values:
- Root Directory: backend
- Build Command: npm install
- Start Command: npm run start

Set environment variables in Render:
- MONGO_URI
- JWT_SECRET
- NODE_ENV=production

---

## Frontend Deployment on Vercel

### 1. Configure Vercel Project

Use these values:
- Root Directory: frontend

### 2. Add Environment Variable

In Vercel project settings, add:

- REACT_APP_API_URL=https://careerviewx.onrender.com

### 3. Redeploy Frontend

After adding or changing environment variables, redeploy from Vercel Deployments.

---

## Issues Faced and Fixes

## Problem 1: Network Error on Other Devices

Symptom:
- Application worked locally but failed for other users from deployed frontend URL.

Root cause:
- Backend was running only on local machine and not deployed to a public server.

Fix:
- Deploy backend to Render and keep frontend on Vercel.

---

## Problem 2: Render Build Failed with Yarn Workspace Error

Error:
- Workspaces can only be enabled in private projects.

Root cause:
- Render attempted to build from repository root with Yarn.

Fix:
- Set Render Root Directory to backend.
- Set Render Build Command to npm install.

---

## Problem 3: Render Failed with No Open Ports Detected

Symptom:
- MongoDB connected, but Render could not detect open listening port.

Fix in backend server:

```js
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
```

Why it works:
- Render requires the server to bind to all interfaces using 0.0.0.0.

---

## Problem 4: Deployment Cancelled

Symptom:
- Deployment status changed to Cancelled after pushing code.

Fix:
- Trigger Manual Deploy from Render dashboard and deploy latest commit.

---

## Problem 5: Vercel Build Failed (index.html Missing)

Error:
- Could not find a required file. Name: index.html
- Searched in: /vercel/path0/public

Root cause:
- Vercel built from wrong directory.

Fix:
- Set Vercel Root Directory to frontend.
- Redeploy.

---

## CORS Configuration for Production

Backend should allow deployed frontend and local development origin:

```js
app.use(cors({
  origin: [
    "https://careerviewx.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));
```

---

## Deployment Verification Checklist

1. Open backend health URL:
   - https://careerviewx.onrender.com
2. Confirm response:
   - { "message": "CareerViewX API is running" }
3. Check Render logs for successful MongoDB Atlas connection.
4. Open frontend URL and test login, protected routes, and API-backed pages.
5. If changes are not visible, redeploy both Render and Vercel.

---

## Recommended Production Practices

1. Never commit .env files.
2. Rotate credentials if secrets were exposed.
3. Keep JWT secret long and random.
4. Use separate environment variables for development and production.
5. Monitor Render logs after each deploy.
