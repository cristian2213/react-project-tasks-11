const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
  // validate if there are erros
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extract the project
  const { project } = req.body; // id

  try {
    // verify that the project exists
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ msg: 'the project does not exist' });
    }

    // verify the project creator 
    if (projectExists.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'The user is not authenticated' });
    }

    //create the task
    const task = await new Task(req.body);

    // save the task
    await task.save();

    // send response object
    res.json({ task });

  } catch (error) {
    res.status(500).json({ error: 'There was an error in the server' });
  }
}

// get tasks
exports.getTasks = async (req, res) => {

  try {

    // extract project
    const { project } = req.query;

    // verify that the project exists
    const projectExists = await Project.findById(project);
    if (!project) {
      return res.status(404).json({ msg: "The project does not exist" });
    }

    // verify project creator
    if (projectExists.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'The creator does not exist' });
    }

    // get tasks
    const tasks = await Task.find({ project }).sort({ _id: -1 });

    res.json({ tasks });

  } catch (error) {
    res.status(500).json({ error: 'There was an error at the server' });
  }
}

// update task
exports.updateTask = async (req, res) => {

  // task body
  const { name, state, project } = req.body;

  // extract task id
  const { id } = req.params;

  try {

    // verify if the task exist
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: 'The task does not exist' });
    }

    // verify project creator
    const projectExists = await Project.findById(project);
    if (projectExists.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'The creator does not exist' });
    }

    // create an objecto with the new infomation
    const newTask = {};

    // validate each field
    if (name) newTask.name = name;
    if (state || state === false) newTask.state = state;

    // update task with id of the task
    task = await Task.findByIdAndUpdate({ _id: id }, { $set: newTask }, { new: true });

    res.json({ task });

  } catch (error) {
    res.status(400).json({ error: 'There was an error in the serve' });
  }
}

// delete task
exports.deleteTask = async (req, res) => {

  try {

    // extract task id
    const { id } = req.params;

    // extrac project (id);
    const { project } = req.query;

    // verify if the tasks exists
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: 'The task does not exist' });
    }

    // verify project creator
    const projectExists = await Project.findById(project);
    if (projectExists.creator.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'The creator does not exist' });
    }

    // delete task
    await Task.findOneAndRemove({ _id: id });
    res.json({ msg: 'The Task was deleted' });


  } catch (error) {
    res.status(500).json({ error: 'There was an error in ther server' });
    console.log(error)
  }
}