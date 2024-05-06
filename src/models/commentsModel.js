const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Comment = new Schema({

    text: { type: String, required: true },
    timestamp: { type : Date, default: Date.now  },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    
});

Comment.virtual('date').get(function() {
    return this.timestamp.toLocaleString();
  });

  // Virtual for message's URL
Comment.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/blog/post/comment/${this._id}`;
  });
  
  // Export model
  module.exports = mongoose.model("Comment", Comment);