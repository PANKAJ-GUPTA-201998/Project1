express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

router.use('/users',require('./users'))
// for anty further routes, access from here
// router.use('/routerName', require('./routerfile));

console.log("new router")
module.exports = router