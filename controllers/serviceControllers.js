const servicModel = require("../model/service");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const router = require("../routes/userRouts");
const fs = require('fs');

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "/uploads/");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
      cb(null, '/uploads/')
  }
});

const upload = multer({ storage: storage });

//Add a singel service
const serviceAdd =
  (upload.single("serviceImage"),
  (req, res) => {
    console.log(req.body);
    const buff = Buffer.from(req.body.file, 'utf-8');
    var newService = new servicModel;
      newService.serviceName = req.body.serviceName;
      newService.serviceDescription = req.body.serviceDescription;
      newService.serviceImage.data =  buff;
      newService.serviceImage.contentType = 'image/jpg'
      newService.save()
      .then(() => res.json("New Service Posted"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
    // const newService = new servicModel({
    //   serviceName: req.body.serviceName,
    //   serviceDescription: req.body.serviceDescription,
    //   serviceImage: req.body.file,
    // });

     
      
    // }

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