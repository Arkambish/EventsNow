import User from "./userModel";

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    topic: {
      type: String,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    isClicked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
