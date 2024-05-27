import User from "./userModel";
import Event from "./eventModel";
import { string } from "zod";

const mongoose = require("mongoose");

const registereduserschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Event,
    required: true,
  },
  eventUpdates: {
    type: Boolean,
    required: true,
  },
  marketingUpdates: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const RegisteredUser =
  mongoose.models.RegisteredUser ||
  mongoose.model("RegisteredUser", registereduserschema);
export default RegisteredUser;
