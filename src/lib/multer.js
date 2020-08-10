const path = require('path');
const multer = require('multer');

module.exports = {
  user_multer: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'public', 'img', 'user', 'avatar'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  }),
  contacts_multer: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'public', 'img', 'contacts', 'avatar'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  }),
};