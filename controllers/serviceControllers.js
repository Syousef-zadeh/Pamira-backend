const servicModel = require("../model/service");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const router = require("../routes/userRouts");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/");
  },
});
// const imgSize = async() =>{
//   const files = await imagemin(['images/*.{jpg,png}'], {
//     destination: './uploads/',
//     plugins: [
//       imageminJpegtran(),
//       imageminPngquant({
//         quality: [0.6, 0.8]
//       })
//     ]
//   })
//     //   const files = await imagemin(["source_dir/*.jpg", "another_dir/*.jpg"], {
//     //   destination: "destination_dir",
//     //   plugins: [imageminMozjpeg({ quality: 50 })],
//     // });
//   console.log("file");
//   console.log(files);
// };

//Add a singel service
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

//Add a singel service
const serviceAdd =
  (upload.single("serviceImage"),
  (req, res) => {
    const buff = Buffer.from(req.body.file, "utf-8");

    var newService = new servicModel();
    newService.serviceName = req.body.serviceName;
    newService.serviceDescription = req.body.serviceDescription;
    newService.serviceImage.data = buff;
    newService.serviceImage.contentType =
      "image/jpg" || "image/jpeg" || "image/png";

    newService
      .save()
      .then(() => res.json("New Service Posted"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });

//get
const services = (req, res) => {
  servicModel.find({}, (err, foundServices) => {
    if (!err) {
      res.json(foundServices);
    } else {
      // res.send(err);
      res.status(400);
      throw new Error("Error Occured!");
    }
  });
};
const serviceDetails = (req, res) => {
  servicModel.findById(req.params.id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.json(docs);
    }
  });
};


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

module.exports = {
  serviceAdd,
  serviceUpdate,
  serviceDelete,
  services,
  serviceDetails,
};
