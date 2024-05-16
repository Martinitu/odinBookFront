const express = require("express");
const router = express.Router();
const verifyToken = require('./verifyToken');


// Require controller modules.

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");


//routes recuest for creating  a post
router.post("/createpost", post_controller.create_post_post);

router.get("/post", post_controller.post_list);

router.get("/post/:id", post_controller.post_detail);

router.post("/post/:id/erase", post_controller.erase_post_post);


//post request for creating a comment
router.post("/post/:id/comment", comment_controller.create_comment_post);

// get request for getting all the comments of a post

router.get("/post/:id/comments", comment_controller.comment_list);


//post request for creating a user
router.post("/user", user_controller.create_user_post);


//post request for sign in a user
router.post("/sign-in", user_controller.sign_in_post);

// get request for loging out
router.get("/log-out", verifyToken, user_controller.logOut_get);

// New route for successful sign-in
router.get("/successful-signin", (req, res) => {
  res.json({ success: true });
});

  

  
  router.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });
  
  router.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });

  module.exports = router;

  