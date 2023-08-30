const User= require('../models/user');
const Post= require('../models/post');
const fs = require('fs-extra');


const registro_user= async (req, res) =>{
    const {username, email, profileImg}= req.body;

    const user= new User({
        username: username.replace(/\s/g, ''),
        email: email,
        profileImg: profileImg
    });
    await user.save();
    res.status(200).json({message: 'ok'});
}

const listar_posts= async (req, res) =>{
    const user= await User.findOne({email: req.params.userEmail});

    if(!user) return res.status(404).json({message: 'user not found'});

    const posts= await Post.find({user: user._id}, { img: 1, _id: 0 });
   
    res.status(200).json(posts);
}



const info_user= async (req, res) =>{
    const user= await User.findOne({username: req.params.username}, { _id: 0 }).populate('posts', { img: 1, _id: 0 });
    if(!user) return res.status(404).json({message: 'user not found'});
    res.status(200).json(user);
}

module.exports= {
    registro_user,
    listar_posts,
    info_user
}
