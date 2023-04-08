const express = require('express');
const { createTask, getTasks, getTaskById, deleteById, updateTaksById } = require('../controllers/taskController');
const router = express.Router();

//create task
router.post('/',createTask)

//get all tasks
router.get('/',getTasks)

//get task by id
router.get('/:id',getTaskById);

//update task by id
router.patch('/:id', updateTaksById);

//delete taks by id
router.delete('/:id', deleteById);

module.exports = router