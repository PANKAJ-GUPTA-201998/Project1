const express = require('express');
const passport =require('passport');
const router = express.Router();
const post = require('../controllers/posts_controller')
// router.get('/',passport.checkAuthentication,homeController.home);
router.get('/',passport.checkAuthentication,post.home)
router.use('/posts',require('./posts'));
router.use('/users',require('./users'));


// for anty further routes, access from here
// router.use('/routerName', require('./routerfile));

console.log("new router")
module.exports = router