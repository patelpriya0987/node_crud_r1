const { body, validationResult } = require('express-validator');

const User = require('../models/recordModel');



const validateRecord = [

  // Validate name
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  // Validate email
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('Email already exists');
      }
      return true;
    }),

  // Validate phone number 
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isNumeric()
    .withMessage('Phone number must contain only digits')
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 digits'),

  // Validate image (either check if it's a valid URL or a file path)
  body('image')
    .optional()
    .isURL()
    .withMessage('Invalid image URL or path')
    .isString()
    .withMessage('Invalid image URL or path'),

];

// let a = validationResult();
// console.log("Va", a.formatter);


module.exports = validateRecord;
