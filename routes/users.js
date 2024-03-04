const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile',usersConrtoller.profile);
router.get('/sign-in',usersConrtoller.signIn);
router.get('/sign-up',usersConrtoller.signUp);
router.post('/create',usersConrtoller.create);
router.post('/create-session',usersConrtoller.create_session);
router.get('/delete-session',usersConrtoller.delete_session);
module.exports = router;