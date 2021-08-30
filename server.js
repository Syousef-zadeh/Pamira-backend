const express = require("express");
const cors = require("cors");
//const bodyParser = require('body-parser');
// const uuid =require('uuid/v4');
const mongoose = require("mongoose");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const serviceModel = require("./model/service.js");
const Registration = require("./model/user.js");

require("dotenv").config({ path: "./config/keys.env" });

const app = express();
app.use(cors());

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.post("/add-services", (req, res) => {
  console.log("Hi");
  const newService = {
    serviceName: "Botox",
    serviceDescription: "very very good!",
    serviceImage: "",
  };
  const service = new serviceModel(newService);
  console.log(service);
  service.save();
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

app.get("/services", function(req, res) {
    serviceModel.find((err, foundServices) => {
    if (!err) {
      res.send(foundServices);
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
