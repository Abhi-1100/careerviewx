# CareerViewX Structure Documentation

This document describes the standardized directory structure for the CareerViewX application, which has been separated into `frontend` and `backend` modules for better maintainability and clearer separation of concerns.

## Standardized Structure

The repository is now structured as a monorepo consisting of distinct frontend and backend directories:

```
careerviewx/
│
├── backend/            # Express.js REST API server
│   ├── config/         # Configuration files (e.g., database connection)
│   ├── middleware/     # Custom Express middlewares (e.g., auth)
│   ├── models/         # Mongoose schema definitions
│   ├── routes/         # Express route handlers
│   ├── seeds/          # Database seeding scripts
│   ├── server.js       # Main application entry point
│   ├── package.json    # Backend dependencies and scripts
│   └── .env            # Backend environment variables
│
├── frontend/           # React single-page application
│   ├── public/         # Static assets like index.html
│   ├── src/            # Source code for React application
│   │   ├── assets/     # Images, fonts, and other static files
│   │   ├── components/ # Reusable React components
│   │   ├── context/    # React context providers
│   │   ├── data/       # Static frontend data
│   │   ├── hooks/      # Custom React hooks
│   │   ├── pages/      # Page-level components
│   │   ├── Services/   # API call wrappers
│   │   ├── utils/      # Utility functions
│   │   ├── App.js      # Main React component
│   │   └── index.js    # Entry point for React
│   ├── package.json    # Frontend dependencies and scripts
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── postcss.config.js  # PostCSS configuration
│
├── docs/               # Documentation
│   └── STRUCTURE.md    # This file
│
├── .gitignore          # Git ignore rules
├── package.json        # Root package.json for monorepo scripts
└── README.md           # Project overview
```

## Running the Application

1. **Install Dependencies:**
   Navigate into both `frontend` and `backend` directories and run `npm install`:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
   Or use the root script if defined: `npm run install:all`

2. **Start Backend Server:**
   ```bash
   cd backend
   npm run start
   ```

3. **Start Frontend Client:**
   ```bash
   cd frontend
   npm run start
   ```
