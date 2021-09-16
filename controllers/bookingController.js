const bookingModel = require("../model/booking");
const asyncHandler = require("express-async-handler");

const addBooking = asyncHandler(async (req, res) => {
  const newBooking = new bookingModel();
  try {
    newBooking.fullName = req.body.fullName;
    newBooking.phoneNumber = req.body.phoneNumber;
    newBooking.desiredDate = req.body.desiredDate;
    newBooking.procedure = req.body.procedure;
    newBooking.comments = req.body.comments;

    console.log(newBooking);
    newBooking
      .save()
      .then(() => res.status(201).json("Successfully Booked!"))
      .catch((errsss) => res.status(400).json(`Error: ${err}`));
  } catch {
    res.status(400).json(`Error: ${err}`);
  }
});

const getBooking = async (req, res) => [
  bookingModel.find({}, (err, foundBooking) => {
    if (!err) {
      res.json(foundBooking);
    } else {
      res.send(err);
    }
  }),
];

module.exports = { addBooking, getBooking };
