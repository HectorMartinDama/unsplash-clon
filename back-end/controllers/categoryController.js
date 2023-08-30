const Category= require('../models/category');
const { cloudinary }= require('../utils/cloudinary');

const register_category= async (req, res) =>{
    const { name, img, description }= req.body;

    const image_cloudinary= await cloudinary.uploader.upload('pruebaCategoria.avif');

    const category= new Category({
        name: name,
        img: image_cloudinary.url,
        public_id: image_cloudinary.public_id,
        description: description
    });

    await category.save();
    res.status(200).json({message: 'ok'});
}


const get_categories_names= async (req, res) =>{
    const categories= await Category.find({}, { name: 1, _id: 0 });
    res.status(200).json(categories);
}




module.exports= {
    register_category,
    get_categories_names
}