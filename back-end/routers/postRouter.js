const postController= require('../controllers/postController');
const postRouter= require('express').Router();


postRouter
    .get('/allPosts', postController.all_posts)
    .post('/createPost', postController.registro_post)
    
module.exports = postRouter;    




