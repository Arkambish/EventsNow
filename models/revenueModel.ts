import Event from "./eventModel";
import TicketType from "./ticketType";
import User from "./userModel";


const mongoose = require ("mongoose");

const RevenueSchema = new mongoose.Schema(
    {
        TicketType: {
            type: String,
            required: [true, "Please enter quantity"],
        },

        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Event,
            required: [true, "Please enter eventId"],
            unique: true,

        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: [true, "Please enter userId"],
            unique: true,
          },
    },

);

const Revenuee = 
    mongoose.models.Revenuee || mongoose.model("Revenuee",RevenueSchema);
export default Revenuee;