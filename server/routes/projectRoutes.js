const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const router = express.Router();

// create project
router.post('/',createProject);

// Get all projects
router.get('/', getProjects);

module.exports = router

