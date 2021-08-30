const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const serviceSchema = new Schema({
    dateCreation:
    {
        type: Date,
        default: Date.now()
    },
    serviceName:
    {
        type: String,
        required: true 
    },
    serviceDescription:
    {
        type: String,
        required: true,
    },
    serviceImage:
    {
        type: String
    }
});
const serviceModel = mongoose.model('Service', serviceSchema);
module.exports = serviceModel;