# NoteOnline

NoteOnline is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing your notes online. It supports user authentication, CRUD operations for notes, and a responsive UI built with React and Bootstrap.

## Features

- User signup and login with JWT authentication
- Add, edit, delete, and view personal notes
- Responsive UI with Bootstrap 5
- Protected routes for authenticated users
- Alerts for user actions

## Folder Structure

```
NoteOnline/
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (running locally on default port)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd NoteOnline
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Start MongoDB

Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017/noteonline`.

### 4. Run the application

You can run both frontend and backend together using:

```bash
cd frontend
npm run both
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## API Endpoints

### Auth

- `POST /api/auth/createuser` — Register a new user
- `POST /api/auth/login` — Login and get JWT token
- `POST /api/auth/getuser` — Get logged-in user details (requires token)

### Notes

- `GET /api/notes/fetchallnotes` — Get all notes (requires token)
- `POST /api/notes/addnote` — Add a new note (requires token)
- `PUT /api/notes/updatenote/:id` — Update a note (requires token)
- `DELETE /api/notes/deletenote/:id` — Delete a note (requires token)

## Environment Variables

- The JWT secret is hardcoded as `'hello'` in the backend for demo purposes. Change it in production.

## License

This project is for learning purposes.

---

**Made with MERN stack**