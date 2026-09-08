# 🤖 AI Interview Agent

An AI-powered mock interview platform that helps candidates practice interviews with AI-generated questions, real-time follow-ups, and detailed performance reports — tailored by role, experience level, and interview mode (HR/Technical).

---

## 🚀 Live Demo

👉 [AI Interview Agent - Frontend](https://ai-interview-agent-czz8.vercel.app)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

- 🔐 **Secure Authentication** — Email/OTP based signup & login, plus Google OAuth
- 📄 **Resume Upload & AI Analysis** — Upload a PDF resume; AI extracts and analyzes content
- 🧠 **AI-Generated Questions** — Dynamic interview questions based on role, experience, and mode (HR / Technical)
- 🔁 **AI Follow-up Questions** — Adaptive follow-ups generated based on candidate's answers
- 📊 **Multi-metric Scoring** — Each answer scored on confidence, communication, and correctness
- 📈 **Detailed Interview Reports** — Per-question feedback + final score
- 💳 **Credit-based Usage System** — Each user starts with limited interview credits
- 📊 **Dashboard & Analytics** — Track interview history and performance over time
- 🔒 **Protected Routes** — JWT-based authentication middleware

---

## 🛠 Tech Stack

**Frontend**
- React.js (Vite)
- Redux (state management)
- Tailwind CSS
- Framer Motion (animations)

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)

**Authentication**
- JWT (token-based)
- Google OAuth
- Email OTP verification (via Brevo)

**AI Integration**
- OpenRouter API — powers resume analysis, question generation, follow-up questions, and feedback/report generation

**File Handling**
- Multer (local storage) — PDF resume uploads

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 🔄 How It Works

```
 User Signup / Login (Email + OTP or Google)
                │
                ▼
        Resume Upload (PDF)
                │
                ▼
   AI Resume Analysis (OpenRouter)
                │
                ▼
  AI Question Generation (role, experience, mode)
                │
                ▼
          Interview Starts
                │
                ▼
Candidate Submits Answer ──► AI Follow-up Question (if applicable)
                │
                ▼
   AI Feedback + Scoring
   (confidence, communication, correctness)
                │
                ▼
          Interview Finished
                │
                ▼
        Report Generated
                │
                ▼
       Dashboard & Analytics
```

---

## 📁 Project Structure

```
interview/
├── client/                     # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/               # Redux store, slices
│   │   ├── services/             # API call helpers
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Node/Express backend
    ├── config/                 # DB connection & app configs
    ├── controllers/             # Route handler logic
    ├── middleware/
    │   ├── isAuth.js             # JWT auth verification
    │   ├── multer.js             # Resume upload handling
    │   └── validate.js           # Request schema validation
    ├── models/
    │   ├── User.js                # User & PendingSignup schemas
    │   └── Interview.js          # Interview & Question schemas
    ├── public/                  # Uploaded resumes (local storage)
    ├── routes/
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   ├── interviewRoutes.js
    │   └── dashboardRoutes.js
    ├── services/                # OpenRouter AI service, Email/Brevo service
    ├── validators/               # Request validation schemas
    ├── .env
    ├── index.js                 # Entry point
    └── package.json
```

---

## 🔌 API Routes

Base URL: `/api`

### 🔐 Auth Routes — `/api/auth`

| Method | Route | Middleware | Description |
|---|---|---|---|
| POST | `/register` | validate(registerSchema) | Register new user |
| POST | `/verify-signup-otp` | — | Verify OTP sent during signup |
| POST | `/login` | authLimiter, validate(loginSchema) | User login |
| POST | `/logout` | isAuth | User logout |
| POST | `/google` | — | Login/signup via Google |
| POST | `/forgot-password` | authLimiter, validate(forgotPasswordSchema) | Request password reset |
| POST | `/verify-otp` | authLimiter, validate(verifyOtpSchema) | Verify password reset OTP |
| POST | `/reset-password` | validate(resetPasswordSchema) | Reset password |

### 👤 User Routes — `/api/user`

| Method | Route | Middleware | Description |
|---|---|---|---|
| GET | `/current-user` | isAuth | Get logged-in user's details |

### 🎤 Interview Routes — `/api/interview`

| Method | Route | Middleware | Description |
|---|---|---|---|
| POST | `/generate-questions` | isAuth | Generate AI interview questions |
| POST | `/resume` | isAuth, upload.single("resume") | Upload & analyze resume (PDF) |
| POST | `/submit-answer` | isAuth | Submit candidate's answer |
| POST | `/finish` | isAuth | Finish/end the interview |
| GET | `/get-interview` | isAuth | Get all interviews of logged-in user |
| GET | `/report/:id` | isAuth | Get interview report by ID |
| POST | `/follow-up` | isAuth | Generate AI follow-up question |

### 📊 Dashboard Routes — `/api/dashboard`

| Method | Route | Middleware | Description |
|---|---|---|---|
| GET | `/` | isAuth | Get user analytics for dashboard |

---

## 🔑 Environment Variables

Create a `.env` file in the `server/` directory with the following variables (also add `client/.env` for frontend config where applicable):

```env
PORT=
MONGO_URL=
JWT_SECRET=
OPENROUTER_API_KEY=

EMAIL_USER=
EMAIL_PASS=

BREVO_API_KEY=
BREVO_EMAIL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CLIENT_URL=
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas connection string)
- OpenRouter API key
- Google OAuth credentials
- Brevo account (for email OTP)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd interview
```

### 2. Setup Backend
```bash
cd server
npm install
# Add your .env file (see above)
npm start
```

### 3. Setup Frontend
```bash
cd client
npm install
# Add your .env file
npm run dev
```

### 4. Open the app
```
Frontend: http://localhost:5173
Backend:  http://localhost:8007
```

---

## 🚀 Deployment

| Layer | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |

---

