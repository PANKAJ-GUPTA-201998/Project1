express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts_controller');

router.get('/', postsController.getHomePage);

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));


// for anty further routes, access from here
// router.use('/routerName', require('./routerfile));

console.log("new router")
module.exports = router