const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serviceLargeSchema = new Schema({
  dateCreation: {
    type: Date,
    default: Date.now(),
  },
  serviceName: {
    type: String,
    required: true,
  },
  serviceShortDes: {
    type: String,
  },
  serviceDescription: {
    type: String,
  },
  serviceImage: {
    data: Buffer,
    contentType: String
  },
});

const serviceLargeModel = mongoose.model("Larg Service", serviceLargeSchema);
module.exports = serviceLargeModel;
