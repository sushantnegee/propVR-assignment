const Project = require("../models/projectModel");

// create project---------------->>
const createProject = async (req, res) => {
  try {
    const { name, description, dueDate, owner, team, tasks } = req.body;

    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return res
        .status(400)
        .json({ message: "A project with the same name already exists" });
    }
    const project = await Project.create({
      name,
      description,
      dueDate,
      owner,
      team,
      tasks,
    });
    return res.status(201).json({ project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get all projects ---------------->>
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("owner team"); // get all data and populate where necessary :: need to add task in populate
    res.status(200).json(projects);
  } catch (error) {
    console.log("error get Project :=>", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

//get project by id
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate("owner team"); // need to populate task

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("error get project by id =>", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// update project by id
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, dueDate, owner, team, tasks } = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, dueDate, owner, team, tasks },
      { new: true }
    ).populate("owner team"); // need to populate tasks
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("error update project", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

//delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id).populate("owner team"); //need to populate tasks
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { createProject, getProjects, getProjectById, updateProject,deleteProject };
