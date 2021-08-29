const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreation: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    default: "Customer",
  },
});

userSchema.pre("save", function(next){
    console.log(this.password)
    bcrypt.hash(this.password, 10)
            .then((encryptPassword) => {
                console.log(encryptPassword);
              this.password = encryptPassword;
              next();
            })
            .catch((err) => console.log(`Error occure when hashing ${err}`));


//   bcrypt
//     .getSalt(10)
//     .then((salt) => {
//       bcrypt
//         .hash(this.password, salt)
//         .then((encryptPassword) => {
//           this.password = encryptPassword;
//           next();
//         })
//         .catch((err) => console.log(`Error occure when hashing ${err}`));
//     })
//     .catch((err) => console.log(`Error occure when salting ${err}`));
});
const RegistrationModel = mongoose.model("RegistrationModel", userSchema);
module.exports = RegistrationModel;
