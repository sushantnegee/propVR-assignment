const express = require('express');
const { createProject, getProjects, updateProject, getProjectById, deleteProject } = require('../controllers/projectController');
const router = express.Router();

// create project
router.post('/',createProject);

// Get all projects
router.get('/', getProjects);

// Get project by id
router.get('/:id', getProjectById);

// Update project by id
router.patch('/:id', updateProject);

// Delete project by id
router.delete('/:id', deleteProject);

module.exports = router

