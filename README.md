# Student CRUD Web Application

## Project Overview

The Student CRUD Web Application is a full-stack web application designed to manage student records. It provides a user interface for performing CRUD operations (Create, Read, Update, and Delete) on student data.

The project consists of a React frontend, a Node.js and Express backend, and a MongoDB database.

## Technologies Used

### Frontend
- React.js
- Vite
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB

### Development Tools
- Git
- GitHub
- npm

## Project Features

- Add new student records.
- View student records.
- Update existing student information.
- Delete student records.
- Store and manage student data using MongoDB.
- Connect the frontend to the backend through API requests.

*Note: The features listed above describe the intended CRUD functionality. Retain only the features implemented in your application.*

## Project Structure

```text
Student-CRUD-FullStack/
│
├── mongo-crud/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── student-crud/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js and npm
- MongoDB, either a local instance or MongoDB Atlas
- A web browser

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/adithya040707-gif/Student-CRUD-FullStack.git
cd Student-CRUD-FullStack
```

### 2. Set Up the Backend

Open a terminal and run:

```bash
cd mongo-crud
npm install
```

Create a `.env` file inside the `mongo-crud` folder and configure the environment variables required by your backend.

For example, if your server uses `MONGO_URI` and `PORT`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Use the actual variable names expected by your `server.js` file. Replace the example values with your own configuration, and never upload database credentials to GitHub.

Start the backend:

```bash
node server.js
```

### 3. Set Up the Frontend

Open a second terminal from the main project folder and run:

```bash
cd student-crud
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173`

Ensure the frontend API URL matches the address and port used by your backend.

## How to Use the Application

1. Start the backend server and ensure MongoDB is available.
2. Start the frontend development server.
3. Open the frontend in your browser.
4. Use the available interface to manage student records.
5. Verify that changes are saved to and retrieved from the database.

## Learning Outcomes

- Understanding full-stack web application development.
- Building a frontend using React.
- Developing backend APIs using Node.js and Express.
- Integrating a web application with MongoDB.
- Using Git and GitHub for source code management.

## Repository

GitHub: https://github.com/adithya040707-gif/Student-CRUD-FullStack

## Conclusion

This project demonstrates the integration of frontend development, backend API development, and database management to create a full-stack student record management application.