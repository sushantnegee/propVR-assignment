const Task = require('../models/taskmodel')

//create all task
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

//get all tasks
const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

module.exports = {createTask,getTasks}