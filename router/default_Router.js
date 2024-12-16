const express = require('express');
const routes = express.Router();
const multer = require('../config/multerConfig.js');
const validateRecord = require('../config/validationMiddleware.js');

const contoller = require('../controller/controller.js');
const { validationResult } = require('express-validator');

routes.get('/', contoller.default_Router);
routes.post('/addRecordController',  multer,validateRecord  ,contoller.addRecordController);
routes.get('/viewRecords', contoller.viewRecords);

module.exports = routes;