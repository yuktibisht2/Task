const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Get a task by ID
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});

// Update a task
router.put('/:id', getTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    if (req.body.dueDate != null) {
        res.task.dueDate = req.body.dueDate;
    }
    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Delete a task
router.delete('/:id', getTask, async (req, res) => {
    console.log(`Deleting task with ID: ${req.params.id}`);
    try {
        await res.task.remove();
        console.log('Task deleted successfully');
        res.json({ message: 'Deleted Task' });
    } catch (err) {
        console.error('Error deleting task:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a task by ID
async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (task == null) {
            console.error('Task not found');
            return res.status(404).json({ message: 'Cannot find task' });
        }
    } catch (err) {
        console.error('Error fetching task:', err.message);
        return res.status(500).json({ message: err.message });
    }
    res.task = task;
    next();
}

module.exports = router;
