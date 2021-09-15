const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingModel = new Schema({
  dateCreation: {
    type: Date,
    default: Date.now(),
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: String,
    required: true,
  },
  procedure: {
    type: String,
    required: true,
  },
});
const bookingModel = mongoose.model("Booking", bookingModel);
module.exports = bookingModel;
