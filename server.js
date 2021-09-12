const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
// const uuid =require('uuid/v4');
const mongoose = require("mongoose");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/userRouts");
const serviceModel = require("./model/service");
const Registration = require("./model/user");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const serviceRoutes = require("./routes/serviceRoutes");

require("dotenv").config({ path: "./config/keys.env" });

const app = express();
app.use(cors());
//app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static("./uploads"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hiiii");
});

// app.post("/services/add", (req, res) => {
//   console.log("Hi");
//   const newService = {
//     serviceName: "skin care",
//     serviceDescription: "",
//     serviceImage: "../01-starting-project/src/assets/skincare.jpg",
//   };
//   const service = new serviceModel(newService);
//   console.log(service);
//   service.save().then((service) => {
//     req.files.photos.name = `pro_pic_${service._id}${
//       path.parse(req.files.photos.name).ext
//     }`;
//     req.files.photos.mv(`public/uploads/${req.files.photos.name}`).then(() => {
//       serviceModel.updateOne(
//         { _id: service._id },
//         {
//           serviceImage: req.files.photos.name,
//         }
//       );
//     });
//   });
// });

// app.get("/services", (req, res) => {
//   serviceModel.find({}, (err, foundServices) => {
//     if (!err) {
//       res.json(foundServices);
//       console.log(foundServices);
//     } else {
//       res.send(err);
//     }
//   });
// });



app.get("/dashboard/profile");

app.use("/api/services", serviceRoutes);

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

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
