const express = require('express');
const router = express.Router();


const commentCreate = require('../controllers/comment_controller');

router.post('/create',commentCreate.Create)


module.exports=router