const express = require("express");
const servicModel = require("../model/service");
const asyncHandler = require("express-async-handler");
const multer = require('multer');
const router = require("../routes/userRouts");
const serviceModel = require("../model/service");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, cb(null, new Date().toISOString() + file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});



// //get
// const services = (req, res, next) => {
//   servicModel
//     .find()
//     .select("serviceName serviceImage _id serviceDescription")
//     .exec()
//     //.then((service) => res.json(service))
//     .then((service) => {
//       const response = {
//         count: service.length,
//         services: service.map((svc) => {
//           return {
//             _id: svc._id,
//             serviceName: svc.serviceName,
//             serviceDescription: svc.serviceDescription,
//             serviceImage: svc.serviceImage,
//           };
//         }),
//       };
//     })
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// };


// const serviceAdd = (req, res) =>{
//   if(req.files === null){
//     return res.status(400).json({msg: 'No file uploaded'});
//   }
//   const file = req.files.file;

//   file.mv(`../../01-starting-project/public/uploads${file.name}`, err =>{
//     if(err){
//       console.error(err);
//        res.status(500).send(err);
//     }
//     res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
//   })
// }
// //Add a singel service
const serviceAdd =
  (upload.single("serviceImage"),
  (req, res, next) => {
    console.log(JSON.stringify(req.body))
    console.log(req.file.originalname);
    const service = new serviceModel({
      serviceName: req.body.serviceName,
      serviceDescription: req.body.serviceDescription,
      serviceImage: req.file.originalname,
    });
    service
      .save()
      .then((result) => {
       // console.log(result);
        res.status(201).json({
          message: "Created service successfully",
          createdService: {
            serviceName: result.serviceName,
            serviceDescription: result.serviceDescription,
            _id: result._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });


    console.log(req.body);
    console.log(req.file);

    if (err) {
      res.status(400);
      throw new Error("Somethin were wrong!");
    } else {
      if (req.file == undefined) {
        res.status(400);
        throw new Error("Error: No file selected!");
      } else {
        res.status(201);
        throw new Error("File Uploaded!");
        // msg: "File Uploaded!",
        // file: `uploads/${req.file.filename}`,

        const newService = new servicModel({
          serviceName: req.body.serviceName,
          serviceDescription: req.body.serviceDescription,
          serviceImage: req.file.originalname,
        });
        newService
          .save()
          .then(() => res.json("New Service Posted"))
          .catch((err) => res.status(400).json(`Error: ${err}`));
      }
    }
 });

//Update service
// const serviceUpdate =
//   (upload.single("serviceUpdate"),
//   (req, res) => {
//     servicModel.findById(req.params.id).then((service) => {
//       (service.serviceName = req.body.serviceName),
//         (service.serviceDescription = req.body.serviceName),
//         (service.serviceImage = req.file.originalname);
//     });
//     service
//       .save()
//       .then(() => res.json("Service UPDATED!"))
//       .catch((err) => res.status(400).json(`Error: ${err}`));
//   });

//Delete service
const serviceDelete = (req, res) => {
  servicModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Service DELETED!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = { serviceAdd};
