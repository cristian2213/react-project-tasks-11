const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticationUser = async (req, res) => {

  const errors = validationResult(req);
  // check if there are errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extract user and password
  const { email, password } = req.body;

  try {
    // checking if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Username does not exist' });
    }

    // check the password: 1. password entered 2. db password
    const passCorrect = await bcrypt.compare(password, user.password);

    // password incorrect
    if (!passCorrect) {
      return res.status(401).json({ error: 'Password incorrect' })
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
    res.status(400).send('There was an error');
  }
}