const User = require("../models/usersModel");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const passport = require("passport");

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
  if (!errors.isEmpty()) {
        // Store the errors in the flash messages
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        // Render the sign-up page again with the errors
        return res.send(errors);
      }


    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      const user = new User({
        
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        
      });
      req.session.user = user;
      const result = await user.save();
      res.send(user);
    } catch(err) {
      return next(err);
    };
  });
  }),
];

exports.sign_in_post = passport.authenticate("local", {
  successRedirect: "/blog/successful-signin",
  failureRedirect: "/"
});



  exports.logOut_get = ("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });