import Event from "./eventModel";
import TicketType from "./ticketType";

const mongoose = require("mongoose");

const BuyticketSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TicketType,
  },

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Event,
  },

  userId: {
    type: String,
    required: [true, "Please enter userId"],
  },

  ticketCode: {
    type: String,
    required: [true, "Please enter ticketCode"],
  },
 
});

const BuyTicket =
  mongoose.models.BuyTicket || mongoose.model("BuyTicket", BuyticketSchema);
export default BuyTicket;
