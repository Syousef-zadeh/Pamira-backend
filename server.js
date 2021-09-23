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
const bookingRoutes = require("./routes/bookingRoutes");
const largeServices = require("./routes/largeService");

require("dotenv").config({ path: "./config/keys.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./uploads"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pamira Clinic");
});

app.use("/api/service/pamira", largeServices);
app.use("/api/services", serviceRoutes);
app.use("/api/booking", bookingRoutes);
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
