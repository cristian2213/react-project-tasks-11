const express = require('express');
// available the routes
const router = express.Router();
// express-validator
const { check } = require('express-validator');

// controller
const authController = require('../controllers/authController');

// authentication to log in
// routes to user auth: /api/auth
router.post('/',
  // rules to validate login (iniciar sesion)
  [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must have 6 characters as min').isLength({ min: 6 })
  ],
  authController.authenticationUser
);

module.exports = router;
