const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please enter user ID"],
  },
  userName: {
    type: String,
    required: [true, "Please enter userName"],
  },
  userImage: {
    type: String,
    required: [true, "Please enter userImage"],
  },
  postId: {
    type: String,
    required: [true, "Please enter postId"],
  },

  description: {
    type: String,
    required: [true, "Please enter description"],
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
