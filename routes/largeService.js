const express = require("express");
const {
  addLargeService,
  getService,
  serviceDelete,
} = require("../controllers/largeServiceController");

const router = express.Router();

router.route("/").get(getService);
router.route("/add").post(addLargeService);
router.route("/:id").delete(serviceDelete);
router.route("/details/:id").get(serviceDetails);


module.exports = router;
