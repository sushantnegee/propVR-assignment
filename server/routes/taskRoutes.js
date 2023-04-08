const express = require('express');
const { createTask, getTasks, getTaskById, deleteById, updateTaksById } = require('../controllers/taskController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

//create task
router.post('/', protect, createTask)

//get all tasks
router.get('/', protect,getTasks)

//get task by id
router.get('/:id',protect, getTaskById);

//update task by id
router.patch('/:id',protect, updateTaksById);

//delete taks by id
router.delete('/:id',protect, deleteById);

module.exports = router