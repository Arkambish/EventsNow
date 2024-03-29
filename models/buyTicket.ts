import Event from "./eventModel";

const mongoose = require("mongoose");

const BuyticketSchema = new mongoose.Schema({
  classType: {
    type: String,
    unique: true,
    required: [true, "Please enter classType"],
  },

  price: {
    type: Number,
    unique: true,
    required: [true, "Please enter price"],
  },

  image: {
    type: String,
    required: [true, "Please enter image"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter quantity"],
  },

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Event,
  },

  userId: {
    type: String,
    required: [true, "Please enter userId"],
  },
});

const BuyTicket =
  mongoose.models.BuyTicket || mongoose.model("BuyTicket", BuyticketSchema);
export default BuyTicket;
