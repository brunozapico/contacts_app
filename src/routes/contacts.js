const router = require('express').Router();

// ** MULTER **
const multer = require('multer');
const multer_storage = require('../lib/multer');
const storage = multer_storage.contacts_multer;
const upload = multer({ storage: storage });
// ** MULTER **

const contactsController = require('../controllers/contactsController');

// LIST
router.get('/', contactsController.list);

// CREATE
router.get('/create', contactsController.create_get);
router.post('/create', upload.any(), contactsController.create_post);

// DETAIL
router.get('/:id', contactsController.detail);

// UPDATE
router.get('/edit/:id', contactsController.update_get);
router.patch('/edit/:id', upload.any(), contactsController.update_patch);

// DESTROY
router.delete('/:id', contactsController.delete_contact);

module.exports = router;