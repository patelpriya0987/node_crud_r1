const express = require('express');
const routes = express.Router();
const upload = require('../config/multerConfig.js');
const validateRecord = require('../config/validationMiddleware.js');

const contoller = require('../controller/controller.js');
const { validationResult } = require('express-validator');

routes.get('/', contoller.default_Router);
routes.post('/addRecordController',  upload ,validateRecord  ,contoller.addRecordController);
routes.get('/viewRecords', contoller.viewRecords);
routes.get('/softDeleteRecord/:id', contoller.softDeleteRecord);
routes.post('/deleteMultipleRecords', contoller.deleteMultipleRecords);
routes.get('/viewDeletedRecords', contoller.viewDeletedRecords);


module.exports = routes;