const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_controller');

router.post('/create',postsController.create);
router.get('/delete/:id',postsController.destroy);

module.exports= router;
