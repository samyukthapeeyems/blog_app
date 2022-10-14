const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers.js');

router.get('/create', blogController.createBlog_get);
router.get('/', blogController.blogIndex);
router.post('/', blogController.createBlog_post);
router.get('/:id', blogController.blogDetails);
router.delete('/:id', blogController.blogDelete);


module.exports = router;