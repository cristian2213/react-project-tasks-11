const express = require('express');
// available the routes
const router = express.Router();
// express-validator
const { check } = require('express-validator');

// controller
const authController = require('../controllers/authController');

// token
const auth = require('../middleware/auth');

// log in
// routes to user auth: /api/auth
router.post('/',
  authController.authenticationUser
);

// get authenticated user
router.get('/',
  auth,
  authController.authenticatedUser
);

module.exports = router;
