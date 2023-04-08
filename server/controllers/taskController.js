const Task = require('../models/taskmodel')

//create all task  ----->
const createTask =async (req,res)=>{
    try {
        const { title, project } = req.body;
        const existingTask = await Task.findOne({ title, project });
        if (existingTask) {
          return res.status(409).send({ message: 'Duplicate task name in project..' });
        }
        const task = await Task.create(req.body);
        res.status(201).send(task);
      } catch (error) {
        res.status(400).send(error.message);
      }
}

//get all tasks ------>
const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find().populate("project assignedTo");
      res.send(tasks);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  // get task by id ---->
  const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id).populate("project assignedTo");
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.send(task);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  //update task by id
  const updateTaksById = async (req, res) => {
    try {
        const {id} = req.params
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true }).populate("project assignedTo");
      res.send(task);
    } catch (error) {
      console.error(error);
      console.log('error updateTaskById =>',error.message)
      res.status(500).send(error.message);
    }
  }

  //delete a task
  const deleteById = async (req, res) => {
    try {
        const {id} = req.params
      const task = await Task.findByIdAndDelete(id).populate("project assignedTo");
      if (!task) {
        return res.status(404).json({ message: "Task not found" })
      }
    //   res.send(task);
    res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

module.exports = {createTask, getTasks, getTaskById, deleteById, updateTaksById}