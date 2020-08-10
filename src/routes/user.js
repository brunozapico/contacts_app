const router = require('express').Router();

// ** MULTER **
const multer = require('multer');
const multer_storage = require('../lib/multer');
const storage = multer_storage.user_multer;
const upload = multer({ storage: storage });
// ** MULTER **

const userController = require('../controllers/userController');

const { isAuthenticated, isNotAuthenticated } = require('../middlewares/auth');

const signupValidator = require('../middlewares/validation/signupValidator');
const signinValidator = require('../middlewares/validation/signinValidator');
const editProfileValidator = require('../middlewares/validation/editProfileValidator');

// PROFILE
router.get('/', isAuthenticated, userController.profile);

// SIGN UP
router.get('/signup', isNotAuthenticated, userController.signup_get);
router.post('/signup', isNotAuthenticated, upload.any(), signupValidator, userController.signup_post);

// LOGIN
router.get('/login', isNotAuthenticated, userController.login_get);
router.post('/login', isNotAuthenticated, signinValidator, userController.login_post);

// LOGOUT
router.get('/logout', isAuthenticated, userController.destroy_session);

// UPDATE
router.get('/edit_profile', isAuthenticated, userController.update_get);
router.patch('/edit_profile', isAuthenticated, upload.any(), editProfileValidator, userController.update_post);

// DESTROY
router.delete('/delete_account', isAuthenticated, userController.delete_user);

module.exports = router;