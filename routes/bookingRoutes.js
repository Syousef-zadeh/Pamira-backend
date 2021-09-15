const express = require("express");
const { addBooking } = require("../controllers/bookingController");
const router = express.Router();

router.route("/add").post(addBooking);

module.exports = router;