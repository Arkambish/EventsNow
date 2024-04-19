import User from "./userModel";

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
const Notification =
  mongoose.models.notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
