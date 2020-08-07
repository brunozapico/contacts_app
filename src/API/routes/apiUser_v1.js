const router = require('express').Router();

const apiUserController = require('../controllers/apiUserController_v1');
const signupValidator = require('../../middlewares/validation/signupValidator');
const editProfileValidator = require('../../middlewares/validation/editProfileValidator');

router.get('/users', apiUserController.users_get);

router.post('/users', signupValidator, apiUserController.user_create_post);

router.get('/users/:id', apiUserController.user_detail_get);

router.patch('/users/:id', editProfileValidator, apiUserController.user_updated_patch);

router.delete('/users/:id', apiUserController.user_delete);

module.exports = router;