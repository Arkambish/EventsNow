import Event from "./eventModel";

const mongoose = require("mongoose");

const ticketTypeSchema = new mongoose.Schema({
  classType: {
    type: String,
    required: [true, "Please enter classType"],
  },

  price: {
    type: Number,
    required: [true, "Please enter price"],
  },

  image: {
    type: String,
    required: [true, "Please enter image"],
  },

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Event,
  },
});

const TicketType =
  mongoose.models.TicketType || mongoose.model("TicketType", ticketTypeSchema);
export default TicketType;
