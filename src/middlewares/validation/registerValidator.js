const path = require('path');
const { check, body } = require('express-validator');

module.exports = [
    check('full_name')
    .isLength({min:2, max: 30})
    .withMessage('Full name must be between 2 and 30 characters.'),

    check('username')
    .isLength({min:5, max: 20})
    .withMessage('Username must be between 5 and 20 characters.'),

    check('password')
    .isLength({min:8, max: 15})
    .withMessage('Password must be between 8 and 15 characters.'),

    body('avatar')
    .custom((value, {req}) => {
        if(req.files[0]) {
            let extension = (path.extname(req.files[0].filename)).toLowerCase();
            switch(extension) {
            case '.jpg':
                return true;
            case '.jpeg':
                return true;
            case '.png':
                return true;
            case '.gif':
                return true;
            default:
                return false;
            }
        } 
        return true;
    })
    .withMessage('File extension must be: ".jpg", ".jpeg", ".png" o ".gif".'),
]