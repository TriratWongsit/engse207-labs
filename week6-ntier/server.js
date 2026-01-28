/**
 * server.js
 * Week 5: CORS + Production-ready config
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Database
const db = require('./database/connection');

// Controllers
const taskController = require('./src/controllers/taskController');

// Middleware
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

/* ======================
   CORS CONFIG (Week 5)
====================== */
const corsOptions = {
    origin: '*',              // อนุญาตทุก origin (dev mode)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

/* ======================
   BODY PARSER
====================== */
app.use(express.json());

/* ======================
   DATABASE CONNECT
====================== */
db.connect();

/* ======================
   ROUTES
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
