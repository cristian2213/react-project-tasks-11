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
/* exports.getTasks = async (req, res) => {
  try {

    // return all tasks
    const tasks = await Task.find({ project: req.user.id }).sort({ created_at: -1 });

    // response client
    res.json({ tasks });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'There was an error at the server' });
  }
} */