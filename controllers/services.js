const express = require('express');
const router = express.Router();
const serviceModel = require("../model/service");

//services
router.get("/", (req, res) => {
    const { userDoc } = req.session;
    res.send("hello");
  });
  
  router.post("/services/add", (req, res) => {
    console.log("Hi");
    const newService = {
      serviceName: "skin care",
      serviceDescription: "",
      serviceImage: "../01-starting-project/src/assets/skincare.jpg",
    };
    const service = new serviceModel(newService);
    console.log(service);
    service.save().then((service) => {
      req.files.photos.name = `pro_pic_${service._id}${
        path.parse(req.files.photos.name).ext
      }`;
      req.files.photos.mv(`public/uploads/${req.files.photos.name}`).then(() => {
        serviceModel.updateOne(
          { _id: service._id },
          {
            serviceImage: req.files.photos.name,
          }
        );
      });
    });
  });
  
  router.get("/services", (req, res) => {
    serviceModel.find({}, (err, foundServices) => {
      if (!err) {
        res.json(foundServices);
        console.log(foundServices);
      } else {
        res.send(err);
      }
    });
  });
  