const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');


// Retrieve a single Todo with id
router.get("/:id", todoController.getById);

// Retrieve all todo list
router.get("/", todoController.index);

// Create a new Todo
router.post("/", todoController.create);

// Update a Todo with id
router.patch("/:id", todoController.update);

// Delete a Todo with id
router.delete("/:id", todoController.delete);

// Delete all Todos
router.delete("/", todoController.deleteAll);

module.exports = router;