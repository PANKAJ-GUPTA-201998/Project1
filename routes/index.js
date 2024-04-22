const express = require('express');
const passport =require('passport');
const router = express.Router();
const home = require('../controllers/home_controller')
// router.get('/',passport.checkAuthentication,homeController.home);
router.get('/',passport.checkAuthentication,home.home)
router.use('/posts',require('./posts'));
router.use('/users',require('./users'));
router.use('/comment',require('./comment'));




console.log("new router");
module.exports = router