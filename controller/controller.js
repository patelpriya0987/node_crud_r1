const recordModel = require('../models/recordModel');
const { validationResult } = require('express-validator');

const default_Router = (req, res) => {
    console.log("default controller");
    res.render('index', { 
        errors: [], 
        formData: {} 
    });
};

const addRecordController = (req, res) => {
    console.log("addRecordController >>", req.body, req.file);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { name, email, phone, status } = req.body;

        // Extract image path
        const imagePath = req.file ? `/upload/${req.file.filename}` : null;

        const newRecord = {
            name,
            email,
            phone,
            image: imagePath,
            status,
            createdAt: new Date(), // Ensure createdAt is always set
        };        

        const recordModel = require('../models/recordModel');
        const record = new recordModel(newRecord);
        record.save()
            .then(() => res.redirect('/'))
            .catch((err) => console.log(err));
    } else {
        res.status(400).render('index', {
            errors: errors.array(),
            formData: req.body
        });
    }
};


const viewRecords = async (req, res) => {
    try {

        const { search, page = 1, limit = 5 } = req.query;

        // Filter condition for search
        const filter = { status: true }; // Show active records only
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } }, // Case-insensitive search
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ];
        }

        const skip = (page - 1) * limit;

        // Fetch records with filter, pagination, and sorting
        const records = await recordModel
            .find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        // Count total records for pagination
        const count = await recordModel.countDocuments(filter);

        res.render('viewRecords', {
            title: 'View Records',
            records,
            search,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            limit
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};
const softDeleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        await recordModel.findByIdAndUpdate(id, { status: false });
        res.redirect('/viewRecords');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error in soft deleting record");
    }
};
const deleteMultipleRecords = async (req, res) => {
    try {
        const { recordIds } = req.body;
        if (!recordIds) return res.redirect('/viewRecords');

        await recordModel.deleteMany({ _id: { $in: recordIds } });
        res.redirect('/viewRecords');
    } catch (err) {
        console.log(err);   
        res.status(500).send("Error in deleting multiple records");
    }
};
const viewDeletedRecords = async (req, res) => {
    try {
        const deletedRecords = await recordModel.find({ status: false });
        res.render('viewDeletedRecords', { deletedRecords });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error in fetching deleted records");
    }
}
module.exports = {
    default_Router , addRecordController , viewRecords , softDeleteRecord , deleteMultipleRecords , viewDeletedRecords
}