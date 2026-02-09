# careerviewx - backend

Minimal Express + MongoDB backend scaffold for the careerviewx frontend.

Quick start

1. cd backend
2. copy `.env.example` to `.env` and fill values
3. npm install
4. npm run dev

API endpoints
- `POST /api/auth/register` { name, email, password } → returns `{ token }`
- `POST /api/auth/login` { email, password } → returns `{ token }`
- `GET /api/auth/me` (authenticated) → returns user profile
