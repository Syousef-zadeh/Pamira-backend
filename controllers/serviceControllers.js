const servicModel = require("../model/service");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const router = require("../routes/userRouts");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../../01-starting-project/src/assets/row-service/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//Add a singel service
const serviceAdd =
  (upload.single("serviceImage"),
  (req, res) => {
    const newService = new servicModel({
      name: req.body.serviceName,
      description: req.body.serviceDescription,
      serviceImage: req.file.originalname,
    });
    newService
      .save()
      .then(() => res.json("New Service Posted"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });

//Update service
const serviceUpdate =
  (upload.single("serviceUpdate"),
  (req, res) => {
    servicModel.findById(req.params.id).then((service) => {
      (service.serviceName = req.body.serviceName),
        (service.serviceDescription = req.body.serviceName),
        (service.serviceImage = req.file.originalname);
    });
    service
      .save()
      .then(() => res.json("Service UPDATED!"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });

//Delete service
const serviceDelete = (req, res) => {
  servicModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Service DELETED!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = { serviceAdd, serviceUpdate, serviceDelete };
