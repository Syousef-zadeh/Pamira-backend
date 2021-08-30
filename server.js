const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
// const uuid =require('uuid/v4');
const mongoose = require("mongoose");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const serviceModel = require("./model/service");
const Registration = require("./model/user");

require("dotenv").config({ path: "./config/keys.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/services/add", (req, res) => {
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

app.post("/sign-up", (req, res) => {
  console.log("Hi");
  const newUser = {
    username: "Admin",
    password: "Parsa1373",
    type: "Admin",
  };
  const signup = new Registration(newUser);
  console.log(signup);
  signup.save();
});

app.get("/services", (req, res) => {
  serviceModel.find({}, (err, foundServices) => {
    if (!err) {
      res.json(foundServices);
      console.log(foundServices);
    } else {
      res.send(err);
    }
  });
});

// app.get("/services", (req, res) => {
//   serviceModel.find().then((service) => {
//     const filterServices = service.map((srv) => {
//       return {
//         id: srv._id,
//         serviceName: srv.serviceName,
//         serviceDescription: srv.serviceDescription,
//         serviceImage: srv.serviceImage,
//       };
//     });
//     res.render("services/service", {
//       data: filterServices,
//     });
//   })
//   .catch(err=>console.log(`Error happened when pulling from the database :${err}`));
// });

app.use(fileUpload());
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect(process.env.Mongo_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) =>
    console.log(`Error occured when connecting to database ${err}`)
  );

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is connected...");
});
