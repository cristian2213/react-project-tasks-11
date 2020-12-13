const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticationUser = async (req, res) => {

  // extract user and password
  const { email, password } = req.body;

  try {
    // checking if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Username does not exist' });
    }

    // check the password: 1. password entered 2. db password
    const passCorrect = await bcrypt.compare(password, user.password);

    // password incorrect
    if (!passCorrect) {
      return res.status(401).json({ msg: 'Password incorrect' })
    }

    // if the password is correct, so create the JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    // sign JWT
    jwt.sign(payload, process.env.SECRET_WORD_JWT, {
      expiresIn: 3600 // 1 hour
    }, (error, token) => {
      if (error) throw error;

      // confirmation message
      res.status(200).json({ token });
    });

    //res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'There was an error' });
  }
}

// get authenticated User
exports.authenticatedUser = async (req, res) => {

  // get user authenticated
  const { id } = req.user;
  try {
    // does not return the password
    const user = await User.findById(id).select('-password');
    res.json({ user });

  } catch (error) {
    res.status(500).json({ msg: 'There was an error' });
  }
}