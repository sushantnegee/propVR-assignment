const express = require('express');
const { createProject, getProjects, updateProject } = require('../controllers/projectController');
const router = express.Router();

// create project
router.post('/',createProject);

// Get all projects
router.get('/', getProjects);

// Update project by id
router.patch('/:id', updateProject);

module.exports = router

