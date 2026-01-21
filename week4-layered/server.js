/**
 * server.js
 * Entry point ของแอปพลิเคชัน
 * ทำหน้าที่:
 *  - สร้าง Express app
 *  - ตั้งค่า middleware
 *  - map routes → controller
 *  - start server
 */

require('dotenv').config();
const express = require('express');

// Database Layer
const db = require('./database/connection');

// Controller Layer
const taskController = require('./src/controllers/taskController');

// Middleware
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(express.json());

/* ======================
   DATABASE CONNECT
====================== */
db.connect();

/* ======================
   ROUTES (Presentation Layer)
====================== */

// GET all tasks
app.get('/tasks', (req, res, next) =>
    taskController.getAll(req, res, next)
);

// GET task by id
app.get('/tasks/:id', (req, res, next) =>
    taskController.get(req, res, next)
);

// CREATE task
app.post('/tasks', (req, res, next) =>
    taskController.create(req, res, next)
);

// UPDATE task
app.put('/tasks/:id', (req, res, next) =>
    taskController.update(req, res, next)
);

// DELETE task
app.delete('/tasks/:id', (req, res, next) =>
    taskController.delete(req, res, next)
);

/* ======================
   ERROR HANDLER
====================== */
app.use(errorHandler);

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
