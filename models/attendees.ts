import Event from "./eventModel";
import User from "./userModel";

const mongoose = require("mongoose");

const AttendantSchema = new mongoose.Schema(
  {
    ticketType: {
      type: String,
      required: [true, "Please enter quantity"],
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Event,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, "Please enter userId"],
      unique: true,
    },
  },
  {
    timestamps: true, // This option will automatically create `createdAt` and `updatedAt` fields
  }
);

const Attendant =
  mongoose.models.Attendant || mongoose.model("Attendant", AttendantSchema);
export default Attendant;
