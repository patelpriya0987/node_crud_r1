const recordModel = require('../models/recordModel');
const { validationResult } = require('express-validator');

const default_Router = (req, res) => {
    console.log("default controller");
    res.render('index',);
}
const addRecordController = (req, res) => {
    console.log("addRecordController", req.body);
    const errors = validationResult(req);
    console.log("err", errors.isEmpty());
    
    console.log("ARRAY", errors.array());
    
    if (errors.isEmpty()) {
        const { name, email, phone, image, status } = req.body;
        
        const newRecord = {
            name,
            email,
            phone,
            image,
            status: status === 'true',
            createdAt: new Date(),
        };
        
        const recordModel = require('../models/recordModel');
        const record = new recordModel(newRecord);
        record.save().then(() => {
           return res.redirect('/');
        }).catch((err) => {
            console.log(err);
        })
    }else{
        res.status(400).render('index', {
        title: 'Add Record',
        errors: errors.array(),
        formData: req.body,
        });
    }
    
    
}
const viewRecords = (req, res) => {
    console.log("viewRecords");
    recordModel.find().then((records) => {
        res.render('viewRecords', {
            title: 'View Records',
            records: records,
        });
    }).catch((err) => {
        console.log(err);
    })
}
module.exports = {
    default_Router , addRecordController , viewRecords
}