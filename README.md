# Task Tracker

A full-stack task management web application built with the MERN stack. Users can create, update, delete, search, filter, and organize tasks through a responsive interface with a RESTful backend and MongoDB database.

🔗 **Live Demo:** https://task-tracker-virid-ten.vercel.app/
🔗 **Backend API:** https://task-tracker-k6u4.onrender.com

## Features

- Create, view, update and delete tasks (CRUD)
- Search tasks by title
- Filter tasks by status (Todo, In Progress, Done)
- Sort tasks by newest or oldest
- Toast notifications for all actions
- Stats bar showing task counts by status
- Loading spinner while fetching data
- Fully responsive UI
- Dynamic updates without page refresh

## Tech Stack

### Frontend
- React.js
- Vite
- CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render

## Project Structure

```text
task-tracker/
|
├── backend/
│   ├── models/Task.js
│   ├── routes/tasks.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskList.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## Local Setup

### Backend
```bash
cd backend
npm install
# Create .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks?status=todo | Filter by status |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |