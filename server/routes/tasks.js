const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
// controller
const taskController = require('../controllers/taskController');
// jwt
const auth = require('../middleware/auth');

// create task
///api/tasks
router.post('/',
  auth,
  [
    check('name', 'The name is required').not().isEmpty(),
    // to remenber that this step is required
    check('project', 'The project is required').not().isEmpty(),
  ],
  taskController.createTask
);

// get tasks
/* router.get('/',
  auth,
  taskController.getTasks()
);
 */
module.exports = router;