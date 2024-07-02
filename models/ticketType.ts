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
  count: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
  },
});

const TicketType =
  mongoose.models.TicketType || mongoose.model("TicketType", ticketTypeSchema);
export default TicketType;

TicketType.collection.dropIndex("classType_1", function (err:any, result:any) {
  if (err) {
    console.log("Error in dropping index:", err);
  } else {
    console.log("Index dropped:", result);
  }
});
