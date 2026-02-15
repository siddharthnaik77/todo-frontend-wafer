# Todo List Frontend

A modern React-based todo list application built with TypeScript. This project provides a clean and intuitive interface for managing your daily tasks.

## Features

- ✅ Add new tasks
- 📋 View all tasks
- 🎯 Manage your todo list efficiently
- 🎨 Dark theme UI with responsive design

## Project Structure

src/
├── App.tsx # Main application component
├── App.test.tsx # App component tests
├── index.tsx # Application entry point
├── index.css # Global styles
├── style.css # Additional styling
├── reportWebVitals.ts # Performance monitoring
├── setupTests.ts # Test configuration
├── pages/
│ ├── Home.tsx # Home page
│ ├── AddTask.tsx # Add task page
│ └── ViewAllTask.tsx # View all tasks page
└── react-app-env.d.ts # React environment types


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install

REACT_APP_API_URL=https://todo-api-c4sk.onrender.com/api

Available Scripts
npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload when you make changes.

npm test
Launches the test runner in interactive watch mode.

npm run build
Builds the app for production to the build folder.
The build is optimized and minified for best performance.

Tech Stack
React - UI library
TypeScript - Type-safe JavaScript
Axios - HTTP client for API requests
Create React App - Build tooling
Styling
The application uses a dark theme with a black background. Styles are defined in:

index.css - Global styles
style.css - Component-specific styles
Project Pages
Home - Main landing page
AddTask - Add new tasks to your todo list
ViewAllTask - Display and manage all tasks
Build Output
Production-ready build artifacts are located in the build directory, including:

Minified CSS and JavaScript files
Asset manifest for deployment
Web app manifest and robots.txt
API Integration
This frontend communicates with a backend API hosted at:

Production: https://todo-api-c4sk.onrender.com/api
Development: Configure in .env file
API Endpoints
GET /api/tasks - Fetch all tasks
POST /api/tasks - Create a new task
PUT /api/tasks/:id - Update a task
DELETE /api/tasks/:id - Delete a task
Deployment
The application is deployed on Vercel:

Frontend URL: https://todo-frontend-wafer.vercel.app
Troubleshooting
CORS Error
If you encounter a CORS error:

Ensure the backend server has CORS enabled for your frontend domain.