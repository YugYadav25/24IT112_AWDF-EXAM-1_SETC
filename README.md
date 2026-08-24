# Employee Leave Management System

A full-stack web application built using the MERN stack for managing employee leave requests. This is the solution for ITUE301 Open-Book Practical Examination (SET C).

## Features

- **React Frontend**: Three distinct pages (Login, ApplyLeave, MyLeaves) with client-side routing.
- **Role-based HR Panel**: Lazy-loaded module for users with the 'HR' role.
- **REST API**: Built with Express.js, featuring proper middleware, global error handling, and authentication.
- **MongoDB Database**: Mongoose schemas with validation for `Employee`, `LeaveType`, and `LeaveRequest`.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB running locally (default: `mongodb://localhost:27017/leave-management`)

### Database Setup

1. Make sure MongoDB is running.
2. Inside the `/backend` folder, run `npm run seed` to seed the database with predefined leave types and mock users. Wait, I should add this script to `package.json`. You can also just run `node seed.js`.
   ```bash
   cd backend
   npm install
   node seed.js
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Start the server (runs on `http://localhost:5000` by default):
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Test Accounts

The `seed.js` script provisions three accounts for testing:
- **Employee**: `john@example.com`
- **Manager**: `jane@example.com`
- **HR**: `hr@example.com`
(No passwords are set for login simplicity. The API expects `{ "email": "<email>" }` to login.)
