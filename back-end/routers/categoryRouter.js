const categoryController= require('../controllers/categoryController');
const categoryRouter= require('express').Router();


categoryRouter
    .post('/createCategory', categoryController.register_category)
    .get('/categoriesNames', categoryController.get_categories_names);



module.exports = categoryRouter;