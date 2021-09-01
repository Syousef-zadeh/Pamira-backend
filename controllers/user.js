const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Registration = require("../model/user");

router.post("/sign-up", (req, res) => {
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
  
  // app.get("/dashboard", (req, res) => {
  //   res.redirect("/dashboard");
  // });
  
  router.post("/dashboard", (req, res) => {
    // let usernameErr = [];
    // let passwordErr = [];
    console.log(req.body);
    // if (req.body.username == "") {
    //   usernameErr.push("Please enter your username");
    // }
  
    // if (req.body.password == "") {
    //   passwordErr.push("Please enter your password");
    // }
  
    // if (usernameErr != 0 || passwordErr != 0) {
    //   res.render("/administrator/login", {
    //     psassErr: passwordErr,
    //     userErr: usernameErr,
    //   });
    //} else {
    //  console.log(req.body.username);
   
    Registration.findOne({ username: req.body.username })
      .then((user) => {
        const error = [];
        if (user == null) {
          error.push("Sorry your username and/or password not found");
          res.render("/dashboard", {
            error,
          });
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((isMatch) => {
              if (isMatch) {
                req.session.userDoc = user;
                res.redirect("/dashboard");
              } else {
                //const paswordError = [];
                //passwordError.push("Sorry your password is incorrect");
                res.render("dashboard", {
                //  passwordError,
                });
              }
            })
            .catch((err) => console.log(`Error1 GOV2 ${err}`));
        }
      })
      .catch((err) => console.log(`Error ${err}`));
    // }
  });
  
  router.get("/dashboard/profile");
  
  router.get("/services", (req, res) => {
    serviceModel
      .find()
      .then((service) => {
        const filterServices = service.map((srv) => {
          return {
            id: srv._id,
            serviceName: srv.serviceName,
            serviceDescription: srv.serviceDescription,
            serviceImage: srv.serviceImage,
          };
        });
        res.render("services/service", {
          data: filterServices,
        });
      })
      .catch((err) =>
        console.log(`Error happened when pulling from the database :${err}`)
      );
  });
  