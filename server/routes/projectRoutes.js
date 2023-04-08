const express = require('express');
const { createProject, getProjects, updateProject, getProjectById, deleteProject } = require('../controllers/projectController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

// create project
router.post('/',protect,createProject);

// Get all projects
router.get('/',protect, getProjects);

// Get project by id
router.get('/:id',protect, getProjectById);

// Update project by id
router.patch('/:id',protect, updateProject);

// Delete project by id
router.delete('/:id',protect, deleteProject);

module.exports = router

