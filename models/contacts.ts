const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter the contact name"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter the contact email"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email address"],
  },
  phone_number: {
    type: String,
    required: [true, "Please enter the contact phone numbe"],
  },
  description: {
    type: String,
    required: [true, "Please enter the contact message"]
  },
    checked: {
        type: Boolean,
        required: [true, "Please enter the contact message"],
    },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;