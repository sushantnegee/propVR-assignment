const express = require('express');
const { createProject } = require('../controllers/projectController');
const router = express.Router();

// create project
router.post('/',createProject);

module.exports = router

