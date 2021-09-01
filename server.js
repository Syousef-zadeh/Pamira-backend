const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
// const uuid =require('uuid/v4');
const mongoose = require("mongoose");
const session = require("express-session");
const fileUpload = require("express-fileupload");

require("dotenv").config({ path: "./config/keys.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const userController = require("./controllers/user");
const serviceController = require("./controllers/services");

// app.use((req, res, next) => {
//   if (req.query.method == "PUT") {
//     req.method = "PUT";
//   } else if (req.query.method == "DELETE") {
//     req.method = "DELETE";
//   }

//   next();
// });

app.use(fileUpload());
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", serviceController);
app.use("/user", userController);

app.use((req, res, next) => {
  //res.locals.user is a global handlebars variable. This means that ever single handlebars file can access
  //that user variable
  res.locals.user = req.session.userDoc;
  next();
});


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
