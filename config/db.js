const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const DB = process.env.DB_URL

mongoose.connect(DB , {useNewUrlParser: true, useUnifiedTopology: true } )
  .then(() => console.log('DB Connected!')).catch((err) =>{
    console.log("err",err);
  })