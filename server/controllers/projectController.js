const Project = require('../models/projectModel')

const createProject = async (req,res)=>{
    try {
        const { name, description, dueDate, owner, team, tasks } = req.body;

    const existingProject = await(Project.findOne({name}));
    if(existingProject){
        return res.status(400).json({message:"A project with the same name already exists"})
    }
    const project = await Project.create({
        name,
        description,
        dueDate,
        owner,
        team,
        tasks
      });
      return res.status(201).json({ project });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {createProject}