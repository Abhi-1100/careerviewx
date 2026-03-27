# CareerViewX Authentication Setup Guide

## 🎉 Implementation Complete!

All backend and frontend code for the authentication system has been successfully implemented. Now you need to complete the setup steps below.

---

## ✅ What Has Been Implemented

### Backend:
✅ Updated User model with email verification and password reset fields
✅ Created email service (`backend/services/emailService.js`) with Gmail SMTP support
✅ Added 5 new authentication endpoints:
  - `POST /api/auth/forgot-password` - Send password reset email
  - `POST /api/auth/reset-password` - Reset password with token
  - `POST /api/auth/verify-email` - Verify email with token
  - `POST /api/auth/google-signin` - Google OAuth sign-in
  - `POST /api/auth/resend-verification` - Resend verification email

### Frontend:
✅ Created 3 new pages:
  - `/forgot-password` - Email form to request password reset
  - `/reset-password?token=...` - Password reset form
  - `/verify-email?token=...` - Email verification confirmation

✅ Updated Login page with:
  - Google Sign-In button integration
  - Forgot password link

✅ Updated API service with new endpoints
✅ Updated App.js with new routes
✅ Updated HTML with Google Sign-In script

---

## 📋 Setup Instructions

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install nodemailer
cd ..
```

### Step 2: Gmail SMTP Setup

1. **Use a Gmail account** (create one if needed)
2. **Enable 2-Factor Authentication**:
   - Go to https://myaccount.google.com/security
   - Find "2-Step Verification" section
   - Click "Get Started" and follow instructions
   - Click "App passwords" (appears after 2FA is enabled)

3. **Create an App Password**:
   - In App passwords section, select "Mail" and "Windows Computer"
   - Google will generate a 16-character password
   - Copy this password

4. **Update backend `.env` file** with your Gmail credentials:
   ```
   SMTP_EMAIL=your-gmail@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx  (the 16-character app password - remove spaces when using)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   API_BASE_URL=http://localhost:5000/api
   ```

### Step 3: Google OAuth Setup

1. **Create Google OAuth credentials**:
   - Go to https://console.cloud.google.com/
   - Create a new project (or use existing one)
   - Navigate to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web Application"
   - Add these URIs to "Authorized JavaScript origins":
     ```
     http://localhost:3000
     http://localhost:3001
     https://your-production-domain.com
     ```
   - Add these URIs to "Authorized redirect URIs":
     ```
     http://localhost:3000
     http://localhost:3001
     https://your-production-domain.com
     ```
   - Copy the "Client ID"

2. **Update frontend `.env` file**:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-copy-pasted-client-id-from-google
   ```

### Step 4: Restart Services

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

---

## 🧪 Testing the Implementation

### Test Email Verification on Signup:
1. Go to `/login` and click "Create one" to signup
2. Fill in the signup form
3. Check your email for verification link
4. Click the link to verify (should redirect to dashboard)
5. If link expired, use "Resend Verification Email" form

### Test Forgot Password:
1. Go to `/forgot-password`
2. Enter your email
3. Check email for password reset link
4. Click link to go to `/reset-password?token=...`
5. Enter new password
6. Should redirect to login with success message
7. Try logging in with new password

### Test Google Sign-In:
1. Go to `/login`
2. Click Google button
3. Select or login with your Google account
4. Should automatically login and redirect to dashboard

---

## 📧 Email Templates

The email service sends beautifully formatted HTML emails for:

1. **Verification Email** (`24-hour` expiration):
   - Title: "Verify Your Email"
   - Link: `/verify-email?token=...`
   - Auto-link clickable or manual token entry option

2. **Password Reset Email** (`1-hour` expiration):
   - Title: "Reset Your Password"
   - Link: `/reset-password?token=...`
   - Security warning about expiration

---

## 🔧 Key Configuration Files

### Backend:
- `.env` - Gmail SMTP and API configuration
- `backend/models/User.js` - Updated with verification fields
- `backend/routes/authRoutes.js` - All authentication endpoints
- `backend/services/emailService.js` - Email sending utility

### Frontend:
- `.env` - Google Client ID
- `frontend/src/pages/ForgotPassword.jsx` - Request password reset
- `frontend/src/pages/ResetPassword.jsx` - Reset password form
- `frontend/src/pages/EmailVerification.jsx` - Email verification page
- `frontend/src/pages/Login.jsx` - Google OAuth integration
- `frontend/src/Services/api.js` - New API endpoints
- `frontend/src/App.js` - New routes

---

## ⚙️ Environment Variables Checklist

### Backend `.env`:
- [ ] `MONGO_URI` - Already set
- [ ] `JWT_SECRET` - Already set
- [ ] `PORT` - Already set
- [ ] `SMTP_EMAIL` - Your Gmail address
- [ ] `SMTP_PASSWORD` - Your 16-char app password (spaces removed)
- [ ] `SMTP_HOST` - smtp.gmail.com
- [ ] `SMTP_PORT` - 587
- [ ] `API_BASE_URL` - http://localhost:5000/api (for local testing)

### Frontend `.env`:
- [ ] `REACT_APP_NEWS_API_KEY` - Already set
- [ ] `REACT_APP_API_URL` - Already set
- [ ] `REACT_APP_GOOGLE_CLIENT_ID` - Your Google Client ID

---

## 🐛 Troubleshooting

### Gmail SMTP Not Working:
- Ensure 2FA is enabled on Gmail account
- Check that App Password was created (not regular password)
- Remove spaces from the 16-char app password when pasting to .env
- Verify SMTP_EMAIL matches the Gmail account used for App Password

### Google Sign-In Not Working:
- Check console for errors
- Verify Client ID is correct
- Ensure all authorized origins/URIs are added in Google Console
- Check that REACT_APP_GOOGLE_CLIENT_ID is set in .env

### Verification Links Returning Error:
- Check that API_BASE_URL matches your backend URL
- Ensure token hasn't expired (24 hours for verification)
- Try resending verification email
- Check backend logs for errors

### Password Reset Links Not Working:
- Token expires in 1 hour
- Request a new password reset if link expired
- Check that token wasn't modified in URL

---

## 📚 File Structure

```
backend/
├── models/
│   └── User.js (✅ Updated)
├── routes/
│   └── authRoutes.js (✅ Updated with 5 new endpoints)
├── services/
│   └── emailService.js (✅ NEW)
├── .env (✅ Updated with email config)
└── package.json (✅ Updated with nodemailer)

frontend/
├── src/
│   ├── pages/
│   │   ├── ForgotPassword.jsx (✅ NEW)
│   │   ├── ResetPassword.jsx (✅ NEW)
│   │   ├── EmailVerification.jsx (✅ NEW)
│   │   └── Login.jsx (✅ Updated with Google OAuth)
│   ├── Services/
│   │   └── api.js (✅ Updated with new endpoints)
│   └── App.js (✅ Updated with new routes)
├── public/
│   └── index.html (✅ Updated with Google Sign-In script)
└── .env (✅ Updated with Google Client ID)
```

---

## 🚀 Next Steps

1. Install dependencies: `npm install` in both backend and frontend
2. Complete all environment variable setup (see checklist above)
3. Test all flows (signup, forgot password, google signin, email verification)
4. Deploy with production URLs in Google Console and .env files
5. Monitor email delivery and authentication logs

---

## 📞 Support

If you encounter any issues:
1. Check backend terminal for error logs
2. Check browser console for frontend errors
3. Verify all .env variables are set correctly
4. Check Gmail account for verification/reset emails
5. Ensure backend is running on port 5000

---

**Implementation completed by Claude! 🎉**
