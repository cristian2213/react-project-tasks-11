const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

  // check if there are errors
  const errors = validationResult(req);
  // there are errors
  if (!errors.isEmpty()) {
    // return an array with each error as an object
    return res.status(400).json({ errors: errors.array() });
  }

  // extract email and password 
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // ckecking if the user exists
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // create the user
    user = new User(req.body);

    // hashear password
    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(password, salt);

    // save user
    await user.save();

    // create and sign the jwt
    const payload = {
      user: {
        id: user.id
      }
    };

    // sign jwt
    jwt.sign(payload, process.env.SECRET_WORD_JWT, {
      expiresIn: 3600 // 1 hour
    }, (error, token) => {
      if (error) throw error;

      // confirmation messages
      res.json({ token });
    });

    // config message
    //res.send('User was created successfully');

  } catch (error) {
    console.log(error);
    res.status(400).send('There was an error');
  }
}