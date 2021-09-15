const bookingModel = require("../model/booking");
const asyncHandler = require("express-async-handler");

const addBooking = asyncHandler(async (req, res) => {
  const newBooking = new bookingModel();
  try {
    newBooking.fullName = req.body.fullName;
    newBooking.phoneNumber = req.body.phoneNumber;
    newBooking.bookingDate = req.body.bookingDate;
    newBooking.procedure = req.body.procedure;

    newBooking.save();
    res.status(201).json("Successfully Booked!");
  } catch {
    res.status(400).json(`Error: ${err}`);
  }
});
