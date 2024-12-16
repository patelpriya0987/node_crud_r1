const mongoose = require('mongoose');
const { type } = require('os');
const recordModelSchema = mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true
    },
    phone : String,
    image : String,
    status : Boolean,
    createdDate : String,
    updatedDate : String
})

const recordModel = mongoose.model('record',recordModelSchema);

module.exports = recordModel;