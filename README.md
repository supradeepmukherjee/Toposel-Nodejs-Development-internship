# Toposel Node.js Development Internship Project

## Overview
This is a Node.js-based backend application built using Express.js. It includes user authentication, validation, and MongoDB integration. The project follows a structured approach with controllers, models, middlewares, and routes.

## Features
- **User Authentication**: Register and login with JWT authentication.
- **MongoDB Integration**: Uses Mongoose for database interactions.
- **Validation**: Input validation with `express-validator`.
- **Middleware**: Custom authentication and error-handling middleware.
- **Deployed**: Deployed on Vercel.

## Tech Stack
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT for Authentication**
- **bcrypt for Password Hashing**
- **express-validator for Input Validation**
- **dotenv for Environment Variables**
- **Vercel for Deployment**

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/supradeepmukherjee/Toposel-Nodejs-Development-internship.git
   cd Toposel-Nodejs-Development-internship
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### **User Authentication**
| Endpoint       | Method | Description |
|---------------|--------|-------------|
| `/register`   | POST   | Register a new user |
| `/login`      | POST   | Login user and return JWT |
| `/search`     | GET    | Search for users (Authenticated) |

## Project Structure
```
Toposel-Nodejs-Development-internship-main/
├── controllers/
│   ├── user.controllers.js
├── middlewares/
│   ├── auth.js
│   ├── error.js
├── models/
│   ├── User.model.js
├── routes/
│   ├── user.routes.js
├── lib/
│   ├── validators.js
├── util.js
├── app.js
├── server.js
├── package.json
├── vercel.json
└── .gitignore
```
