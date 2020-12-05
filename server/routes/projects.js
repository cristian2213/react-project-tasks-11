const express = require('express');
// available the routes
const router = express.Router();
// express-validator
const { check } = require('express-validator');
// controller
const projectController = require('../controllers/projectController');
// token
const auth = require('../middleware/auth');

// routes to user auth: /api/projects
// create a project
router.post('/',
  auth,
  [
    check('name', 'The project name is required').not().isEmpty()
  ],
  projectController.createProject
);

// get all prjects
router.get('/',
  auth,
  projectController.getProjects
);

// update project
router.put('/:id',
  auth,
  [
    check('name', 'The project name is required').not().isEmpty()
  ],
  projectController.updateProject
);

// delete project
router.delete('/:id',
  auth,
  projectController.deleteProject
)

module.exports = router;
