const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
// const uuid =require('uuid/v4');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const serviceModel = require('./model/service');
require('dotenv').config({path:"./config/keys.env"});


var app = express()
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => res.send('hello world'));
app.post('/add-services', (req, res)=>{
    console.log("Hi");
    const newService =
    {
        serviceName: "Botox",
        serviceDescription: "very very good!",
        serviceImage: ""
    }
    const service = new serviceModel(newService);
    console.log(service);
    service.save();
})

app.use(fileUpload());
app.use(session({
secret: `${process.env.SESSION_SECRET}`,
 resave: false,
 saveUninitialized: true}))


mongoose.connect(process.env.Mongo_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB`);
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));

const PORT = process.env.PORT;
app.listen(PORT,()=>{

    console.log("Server is connected...")
});