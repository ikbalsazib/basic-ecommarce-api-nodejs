const { body } = require('express-validator/check');

// For Admin..
exports.checkAdminRegInput = [
    body('username').not().isEmpty().withMessage('Please enter a valid username!'),
    body('password').trim().isLength({min: 5}).withMessage('Oops! Password must be longer.'),
    body('name').trim().not().isEmpty().withMessage('Please enter a valid name!'),
    body('phoneNo').trim().not().isEmpty().withMessage('Please enter a valid phone no!')
];

exports.checkAdminLoginInput = [
    body('username').not().isEmpty().withMessage('Please enter a valid username!'),
    body('password').trim().isLength({min: 5}).withMessage('Oops! Password must be longer.')
];

