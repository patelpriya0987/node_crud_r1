const { body, validationResult } = require('express-validator');



// console.log("djkf",   body('name')
// .notEmpty());


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
    .withMessage('Invalid email format'),

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

  // Validate status (ensure it's a boolean value)
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['true', 'false'])
    .withMessage('Status must be either true or false'),

];

// let a = validationResult();
// console.log("Va", a.formatter);


module.exports = validateRecord;
