
const Post = require("../models/postsModel");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


// create a Post
exports.create_post_post = [
    // Validate and sanitize fields.
    body("title", "title must not be empty.")
    .trim()
    .isLength({ min: 5 })
    .escape(),
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
           const post = new Post({
           
            user: req.params.userId,
            likes: req.body.likes, //? fix this
            text: req.body.text,
            
               
           });
           const result = await post.save();
           res.send(post)
    
         } catch(err) {
           return next(err);
         };
 
})

];



// Get list of all Posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}, "title text timestamp")
    .sort({ timestamp: 1 })
    .populate("title")
    .populate("text")
    .populate("visible")

    .exec();

  res.send(allPosts);
});

// Display detail page for a specific POst.
exports.post_detail = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
  const post = await Promise.all([
    Post.findById(req.params.id).populate("title").populate("text").exec(),
    
  ]);

  if (post === null) {
    // No results.
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.send(post);
});

exports.erase_post_post = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;

  try {
    
    const result = await Post.findOneAndDelete({ _id: postId });
    if (result) {
      res.send("post erased");
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    return next(err);
  }
});