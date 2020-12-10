const jwt = require('jsonwebtoken');

/* middleware to verify if the user is authenticated */
module.exports = function (req, res, next) {
  // read the header token
  const token = req.header('x-auth-token');
  //console.log(token);

  // check if there isn't a token
  if (!token) {
    return res.status(401).json({ msg: "There isn't a token, invalid permission" })
  }

  // validate token
  try {
    // return the payload
    const encryption = jwt.verify(token, process.env.SECRET_WORD_JWT);

    // create a new object with the token (id)
    req.user = encryption.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'The token is not validated' });
  }
}