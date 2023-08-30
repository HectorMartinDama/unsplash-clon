const userController= require('../controllers/userController');
const userRouter= require('express').Router();
const auth= require('../middlewares/validateRegisterUser');

userRouter
    .get('/userInfo/:username', userController.info_user)
    .get('/allPosts/:userEmail', userController.listar_posts)
    .post('/register', auth, userController.registro_user);



module.exports= userRouter;