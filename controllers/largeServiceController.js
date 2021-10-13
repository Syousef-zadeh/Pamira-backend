const serviceLargeModel = require("../model/serviceLarge");
const router = require("../routes/largeService");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/");
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  //imgSize: imgSize,
  fileFilter: fileFilter,
});

const addLargeService =
  (upload.single("largeServiceImage"),
  (req, res) => {
    const buff = Buffer.from(req.body.file, "utf-8");

    var newService = new serviceLargeModel();
    newService.serviceName = req.body.serviceName;
    newService.serviceDescription = req.body.serviceDescription;
    newService.serviceShortDes = req.body.serviceShortDes;
    newService.serviceImage.data = buff;
    newService.serviceImage.contentType =
      "image/jpg" || "image/jpeg" || "image/png";

    newService
      .save()
      .then(() => res.json("New Service Posted"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });

const getService = (req, res) => {
  serviceLargeModel.find({}, (err, found) => {
    if (!err) {
      res.json(found);
    } else {
      res.send(err);
    }
  });
};

const lgServiceDetails = (req, res) => {
  serviceLargeModel.findById(req.params.id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.json(docs);
    }
  });
};

  const serviceDelete = (req, res) => {
    serviceLargeModel
      .findByIdAndDelete(req.params.id)
      .then(() => res.json("Service DELETED!"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  };
  
module.exports = { addLargeService, getService, serviceDelete, lgServiceDetails };
