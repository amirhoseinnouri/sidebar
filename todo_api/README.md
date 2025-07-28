# Todo List API & Frontend

This project provides a simple Todo List application with a Node.js Express API as the backend and a pure HTML, CSS, and JavaScript frontend. You can choose to run the backend with or without a MongoDB database.

---

## Project Structure

todo-api/
├── public/                 # Frontend files (HTML, CSS, JS for the UI)
│   ├── index.html          # Main HTML page
│   ├── style.css           # CSS for styling the Todo List
│   └── script.js           # JavaScript for interacting with the API and managing the UI
├── config/                 # (Optional) Database configuration
│   └── db.js               # MongoDB connection setup (only if using MongoDB)
├── controllers/            # API logic for handling Todo operations
│   └── todoController.js
├── models/                 # (Optional) Mongoose models
│   └── Todo.js             # Mongoose schema for Todo items (only if using MongoDB)
├── routes/                 # API route definitions
│   └── todoRoutes.js
├── app.js                  # Main application file (Express server setup)
├── package.json            # Project dependencies and scripts
└── .env                    # (Optional) Environment variables like MongoDB URI


---

## Features

### Backend (Node.js Express API)

* **RESTful API:** Provides endpoints for CRUD (Create, Read, Update, Delete) operations on Todo items.
* **Flexible Data Storage:** Can be configured to use:
    * **MongoDB:** For persistent data storage (recommended for production).
    * **In-memory Array:** For temporary data storage (useful for quick testing without a database).
* **Clean Architecture:** Separates concerns into `models`, `controllers`, and `routes` for better organization.

### Frontend (HTML, CSS, JavaScript)

* **Interactive UI:** Allows users to view, add, mark as complete, and delete todo items directly in the browser.
* **Dynamic Content:** Updates the Todo list in real-time by fetching data from the backend API.
* **Modern Design:** Styled with CSS for a clean and user-friendly appearance.
* **Responsive:** Adapts to different screen sizes (mobile, tablet, desktop).

---

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

* **Node.js & npm:** Make sure you have Node.js (which includes npm) installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repository (or create the project structure manually):**
    ```bash
    git clone <repository_url> # If you have a Git repo
    cd todo-api
    ```
    If you created the project manually, navigate to your `todo-api` directory.

2.  **Install dependencies:**
    ```bash
    npm install express mongoose dotenv # Install all required packages
    ```
    * `express`: Web framework for Node.js.
    * `mongoose`: (Optional, only for MongoDB) Object Data Modeling (ODM) for MongoDB.
    * `dotenv`: (Optional, only for MongoDB) For loading environment variables from a `.env` file.

---

## Running the Project

You have two options for running the backend: **with MongoDB (persistent data)** or **without MongoDB (in-memory data)**.

---

### Option 1: Running with MongoDB (Recommended for Persistent Data)

This option requires you to have a MongoDB database. You can use a local MongoDB instance or a cloud service like MongoDB Atlas (which offers a free tier).

1.  **Set up MongoDB:**
    * If using MongoDB Atlas, create a cluster and get your connection string.
    * If using local MongoDB, ensure your MongoDB server is running.

2.  **Create `.env` file:**
    In the root of your `todo-api` project, create a file named `.env` and add your MongoDB connection URI:

    ```
    MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER_URL/YOUR_DATABASE_NAME?retryWrites=true&w=majority
    PORT=5000
    ```
    **Replace placeholders** with your actual MongoDB credentials and cluster URL.

3.  **Ensure correct backend files:**
    * `config/db.js`: Should contain the `connectDB` function.
    * `models/Todo.js`: Should contain the Mongoose `Todo` schema.
    * `controllers/todoController.js`: Should import and use the `Todo` model.
    * `app.js`: Should import `dotenv` and `connectDB`, and call `connectDB()`.

4.  **Run the Node.js server:**
    Open your terminal in the `todo-api` directory and run:
    ```bash
    node app.js
    ```
    You should see messages like `MongoDB Connected: ...` and `Server running on port 5000`.

5.  **Access the Frontend:**
    Open your web browser and navigate to:
    ```
    http://localhost:5000/
    ```

---

### Option 2: Running without MongoDB (In-Memory Data - For Quick Testing)

This option is perfect for quick testing as it doesn't require any database setup. However, all data will be lost when the server restarts.

1.  **Remove MongoDB-related files (if they exist):**
    * Delete `config/db.js`
    * Delete `models/Todo.js`
    * Delete `.env` (optional, but good for cleanliness)

2.  **Modify `app.js`:**
    Ensure your `app.js` file is updated to **remove all references to `dotenv` and `connectDB`**. It should look like this (or similar, depending on other specific changes you might have made):

    ```javascript
    // app.js
    const express = require('express');
    const path = require('path');
    // const dotenv = require('dotenv'); // Remove or comment out this line
    // const connectDB = require('./config/db'); // Remove or comment out this line

    const todoRoutes = require('./routes/todoRoutes');

    // Remove or comment out these lines as they are no longer needed
    // dotenv.config();
    // connectDB();

    const app = express();

    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.use('/api/todos', todoRoutes);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    ```

3.  **Modify `controllers/todoController.js`:**
    Update this file to use an in-memory array for storing todos instead of Mongoose. The example provided in the previous response will work.

    ```javascript
    // controllers/todoController.js (simplified for in-memory)
    let todos = []; // This array will hold your todo items
    let nextId = 1;

    // Implement getTodos, getTodoById, createTodo, updateTodo, deleteTodo
    // using this 'todos' array and 'nextId'
    // ... (refer to previous response for full code)
    ```

4.  **Run the Node.js server:**
    Open your terminal in the `todo-api` directory and run:
    ```bash
    node app.js
    ```
    You should see a message like `Server running on port 5000`.

5.  **Access the Frontend:**
    Open your web browser and navigate to:
    ```
    http://localhost:5000/
    ```
    Any todos you add will be lost when you stop the server.

---

## How to Interact with the API (using Thunder Client or Postman)

Even with the frontend, you can still test the API endpoints directly.

**Base URL:** `http://localhost:5000/api/todos`

* **GET All Todos:**
    * `GET /api/todos`
* **GET Single Todo:**
    * `GET /api/todos/:id` (Replace `:id` with an actual todo ID)
* **CREATE Todo:**
    * `POST /api/todos`
    * **Body (JSON):**
        ```json
        {
            "title": "My New Todo",
            "description": "Details about my new todo"
        }
        ```
* **UPDATE Todo:**
    * `PUT /api/todos/:id`
    * **Body (JSON):** (You can send one or more fields to update)
        ```json
        {
            "title": "Updated Todo Title",
            "completed": true
        }
        ```
* **DELETE Todo:**
    * `DELETE /api/todos/:id`

---

## Enjoy your Todo List!