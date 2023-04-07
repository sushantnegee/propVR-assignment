const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const router = express.Router();

//create task
router.post('/',createTask)

//get all tasks
router.get('/',getTasks)

module.exports = router