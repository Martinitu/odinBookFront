const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const verifyToken = require("./verifyToken")

exports.create_user_post = [

    // Validate and sanitize fields.
    body("email", "email must not be empty.")
    .trim()
    .isLength({ min: 5 })
    .escape(),
    body("name", "name must not be empty.")
    .trim()
    .isLength({ min: 5 })
    .escape(),
 
  body("password", "Password must not be empty").isLength({ min: 4 }).escape(),
  body('passwordConfirmation', "Password do not match").custom((value, { req }) => {
    return value === req.body.password;
  }),
// Process request after validation and sanitization.

asyncHandler( async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
        // Store the errors in the flash messages
        errors.array().forEach((error) => {
          console.log('error', error.msg);
        });
        // Render the sign-up page again with the errors
        return res.send(errors);
      }


    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {

      console.log(req.body)
      const user = new User({
        
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        
      });
      console.log(user)
     // req.session.user = user;
      const result = await user.save();
      res.send(user);
    } catch(err) {
      return next(err);
    };
  });
  }),
];

exports.sign_in_post = asyncHandler(async (req, res) => {


  // Retrieve user credentials from the request body 
const user = {
  mail: req.body.email,
  password:req.body.password,
 
}

  // For demonstration purposes, let's assume you've already authenticated the user and retrieved their details
  const dataUser = await User.findOne({ email: user.mail });
  console.log(dataUser);
  const match = await bcrypt.compare(user.password, dataUser.password);
  console.log(match);

  if (!dataUser) {
    return console.log('Incorrect username' );
   
  }
  if (!match) {
    return console.log('Incorrect password');
   
  }else {
  // Assuming user details are retrieved and stored in the `user` object
  

  // Sign JWT token
  jwt.sign({ user }, 'secret_key', {expiresIn: '1d'}, (err, token) => {
    if (err) {
      // Handle error
      res.status(500).json({ error: 'Failed to generate token' });
    } else {
      // Send token as response
      res.json({ token });
    }
  });
};
});





  exports.logOut_get = ( (req, res, next) => {
    const token = req.token;

  // Call the verifyToken function
  verifyToken(token, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'log Out',
        authData
      });
    }
  });

    console.log("log out")
   
  });

  