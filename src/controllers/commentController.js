
const Comment = require("../models/commentsModel");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


// create a Comment
exports.create_comment_post = [
    // Validate and sanitize fields.

    body("text", "text must not be empty.")
    .trim()
    .isLength({ min: 5 })
    .escape(),


    // Process request after validation and sanitization.
asyncHandler( async (req, res, next) => {
   const errors = validationResult(req);
   
   if (!errors.isEmpty()) {

         // Store the errors in the flash messages
         errors.array().forEach((error) => {
           req.flash('error', error.msg);
         });
        console.log(req.body)
         console.log(errors)
         res.send(errors)
       };
       try {
           const comment = new Comment({
             
             name: req.body.name,
             text: req.body.text,
             user: req.params.userId,
             post: req.params.postId
               
           });
           const result = await comment.save();
           res.status(201).send({ message: 'Comment created successfully', comment: result });
    
         } catch(err) {
           return next(err);
         };
 
})

];



// Get list of all comments of a Post.
exports.comment_list = asyncHandler(async (req, res, next) => {

  const post = req.params.id

  const allComments = await Comment.find({ "post": post}, "text timestamp")
    .sort({ timestamp: 1 })
    .populate("text")
    .exec();
  

  res.send(allComments);
});