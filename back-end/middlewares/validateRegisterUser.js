const User= require('../models/user');

module.exports= async (req, res, next) =>{
    const user= await User.findOne({email: req.body.email });
    if(user) return res.status(400).json({error: 'user exists'});
    next();
}