const path = require('path');
const { check, body } = require('express-validator');

module.exports = [
    check('username')
    .isLength({min:5, max: 20})
    .withMessage('Username must be between 5 and 20 characters.'),

    check('password')
    .isLength({min:8, max: 15})
    .withMessage('Password must be between 8 and 15 characters.'),
]