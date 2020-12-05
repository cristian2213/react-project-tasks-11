const express = require('express');
// available the routes
const router = express.Router();
// express-validator
const { check } = require('express-validator');

// controller
const userController = require('../controllers/userController');

// create user
// routes to create user: /api/users
router.post('/',
  // rules to validate each field of the form
  [
    check('name', 'The name is required').isString().not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must have 6 characters as min').isLength({ min: 6 })
  ],
  userController.createUser
);

module.exports = router;

