const express = require("express");
const { addBooking, getBooking } = require("../controllers/bookingController");
const router = express.Router();

router.route("/").get(getBooking);
router.route("/add").post(addBooking);

module.exports = router;
