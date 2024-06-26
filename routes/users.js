const express = require('express');
const router = express.Router();
const passport =require('passport');

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication ,usersConrtoller.profile);
router.post('/update/:id',usersConrtoller.update);
router.get('/sign-in',usersConrtoller.signIn);
router.get('/sign-up',usersConrtoller.signUp);
router.post('/create',usersConrtoller.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
),usersConrtoller.create_session);

router.get('/sign-out',usersConrtoller.destroySession);
module.exports = router;
