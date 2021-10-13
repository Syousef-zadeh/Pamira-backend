const express = require("express");
const {
  addLargeService,
  getService,
  serviceDelete,
  lgServiceDetails,
} = require("../controllers/largeServiceController");

const router = express.Router();

router.route("/").get(getService);
router.route("/add").post(addLargeService);
router.route("/:id").delete(serviceDelete);
router.route("/details/:id").get(lgServiceDetails);


module.exports = router;
