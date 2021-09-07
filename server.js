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
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hiiii");
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

// app.post("/sign-up", (req, res) => {
//   console.log("Hi");
//   const newUser = {
//     username: "Admin",
//     password: "Parsa1373",
//     type: "Admin",
//   };
//   const signup = new Registration(newUser);
//   console.log(signup);
//   signup.save();
// });

// app.post("/dashboard", (req, res) => {
//   // let usernameErr = [];
//   // let passwordErr = [];
//   console.log(req.body);
//   // if (req.body.username == "") {
//   //   usernameErr.push("Please enter your username");
//   // }

//   // if (req.body.password == "") {
//   //   passwordErr.push("Please enter your password");
//   // }

//   // if (usernameErr != 0 || passwordErr != 0) {
//   //   res.render("/administrator/login", {
//   //     psassErr: passwordErr,
//   //     userErr: usernameErr,
//   //   });
//   //} else {
//   //  console.log(req.body.username);
//   Registration.findOne({ username: req.body.username })
//     .then((user) => {
//       const error = [];
//       if (user == null) {
//         error.push("Sorry your username and/or password not found");
//         res.render("/dashboard", {
//           error,
//         });
//       } else {
//         bcrypt
//           .compare(req.body.password, user.password)
//           .then((isMatch) => {
//             if (isMatch) {
//               req.session.userDocument = user;
//               res.redirect("/dashboard");
//             } else {
//               const passwordError = [];
//               passwordError.push("Sorry your password is incorrect");
//               res.render("dashboard", {
//                 passwordError,
//               });
//             }
//           })
//           .catch((err) => console.log(`Error1 GOV2 ${err}`));
//       }
//     })
//     .catch((err) => console.log(`Error ${err}`));
//   // }
// });

app.get("/dashboard/profile");

// app.get("/services", (req, res) => {
//   serviceModel
//     .find()
//     .then((service) => {
//       const filterServices = service.map((srv) => {
//         return {
//           id: srv._id,
//           serviceName: srv.serviceName,
//           serviceDescription: srv.serviceDescription,
//           serviceImage: srv.serviceImage,
//         };
//       });
//       res.render("services/service", {
//         data: filterServices,
//       });
//     })
//     .catch((err) =>
//       console.log(`Error happened when pulling from the database :${err}`)
//     );
// });

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
