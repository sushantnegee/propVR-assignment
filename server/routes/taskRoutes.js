const express = require('express');
const { createTask, getTasks, getTaskById } = require('../controllers/taskController');
const router = express.Router();

//create task
router.post('/',createTask)

//get all tasks
router.get('/',getTasks)

//get task by id
router.get('/:id',getTaskById);

module.exports = router