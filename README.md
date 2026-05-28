# CUET_Foods

A university campus food ordering platform built for CUET students.

## Overview

`CUET_Foods` is a full-stack food ordering system designed for campus dining management. The project includes:

- A Node.js/Express backend API for authentication, food management, order processing, reviews, and user roles.
- A React frontend for students and vendors, built with Material UI and Sass for a responsive campus experience.
- A MySQL-backed database with automated table creation and secure user authentication.

## Key Features

- Student and vendor authentication
- Food menu browsing and item management
- Order placement and tracking
- Review and rating support
- Public, student, vendor, and admin-style route separation
- File uploads and media handling using Cloudinary and Multer

## Technology Stack

### Backend

- Node.js
- Express 5
- MySQL via `mysql2`
- JSON Web Tokens (`jsonwebtoken`)
- Password hashing with `bcryptjs`
- Environment variables with `dotenv`
- Cross-origin requests with `cors`
- File upload support with `multer`
- Cloudinary integration for media storage
- Development server reloading with `nodemon`

### Frontend

- React 19
- React Router DOM 7
- Material UI (`@mui/material`)
- Sass for styling
- Lottie animations with `lottie-react`
- React icons and rating components

## Repository Structure

- `backend/` - Express server and API implementation
  - `server.js` - main backend entry point
  - `src/config/` - database and environment configuration
  - `src/routes/` - API route definitions
  - `src/controllers/` - request handlers
  - `src/models/` - data models and mapping
  - `src/queries/` - SQL query definitions
  - `src/services/` - business logic and helpers
  - `src/utils/` - utility functions, including table creation

- `frontend/` - React single-page application
  - `src/App.js` - application root and router setup
  - `src/pages/` - individual page views
  - `src/components/` - reusable UI components
  - `src/context/` - application state and providers

## Getting Started

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your configuration values, such as:
   ```env
   PORT=4000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=cuet_foods
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the backend:
   ```bash
   npm run start
   ```

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## Notes

- The backend automatically initializes and creates required tables on startup.
- The frontend is built with React using `react-scripts` for local development.
- Adjust the API base URL in the frontend if the backend runs on a different host or port.


