const express = require("express");
const {
  serviceAdd,
  serviceUpdate,
  serviceDelete,
  services,
} = require("../controllers/serviceControllers");
const router = express.Router();

// router.route("/").get(services);
router.route("/add").post(serviceAdd);
// router.route("update:id").put(serviceUpdate);
// router.route("/:id").delete(serviceDelete);

module.exports = router;
