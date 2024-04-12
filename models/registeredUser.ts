import User from "./userModel";
import Event from "./eventModel";

const mongoose = require('mongoose')
const registeredUserSchema   = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter the user Id"]
    },
    event : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Event,
        required: [true, "Please enter the event Id"]
    },
    eventUpdates: {
        type: Boolean,
        default: false
    },
    marketingUpdates: {
        type: Boolean,
        default: false
    }
    });

    const RegisteredUser = mongoose.models.RegisteredUser || mongoose.model("RegisteredUser", registeredUserSchema);
    export default RegisteredUser;