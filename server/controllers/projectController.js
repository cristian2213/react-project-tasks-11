const Project = require('../models/Project');
const { validationResult } = require('express-validator');


// create project
exports.createProject = async (req, res) => {
  // check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // create the user
    const project = new Project(req.body);

    // save the creator
    project.creator = req.user.id;

    // save the user
    await project.save();

    res.json({ project });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'There was an errror' });
  }
}

// get all projects
exports.getProjects = async (req, res) => {
  try {
    // {} -> here go the condition
    // sort -> sort descending
    const projects = await Project.find({ creator: req.user.id }).sort({ created_at: -1 });

    // response for the client
    res.json({ projects });

  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: 'There was an error' });
  }
}

// update project
exports.updateProject = async (req, res) => {

  // validate project
  const erros = validationResult(req);
  // there are errors
  if (!erros.isEmpty()) {
    return res.status(401).json({ msg: 'The project name is not validated' });
  }

  // extract user and password
  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {

    // check id
    const { id } = req.params;
    const project = await Project.findById(id);


    // check if exists a project
    if (!project) {
      return res.status(404).json({ msg: "The project doesn't exist" });
    }

    // verify the project creator
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'The user is not authenticated' });
    }

    // update the project
    const updateProject = await Project.findByIdAndUpdate({ _id: id }, { $set: newProject }, { new: true });

    // response to the user
    res.json({ updateProject });

  } catch (error) {
    res.status(500).json({ error: 'There was an error in the server' });
  }
}

// Delete a project
exports.deleteProject = async (req, res) => {

  try {

    // check id
    const { id } = req.params;
    const project = await Project.findById(id);


    // check if exists the project to delete
    if (!project) {
      return res.status(404).json({ msg: "The project doesn't exist" });
    }

    // verify the project creator
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'The user is not authenticated' });
    }

    // delete  project
    const deleteProject = await Project.findByIdAndDelete(id);

    // response to the user
    res.json({ deleteProject });

  } catch (error) {
    res.status(500).send('There was an error in the server');
  }
}