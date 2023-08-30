const Post= require('../models/post');
const User= require('../models/user');

const { cloudinary }= require('../utils/cloudinary');


const registro_post= async (req, res) =>{
    const { labels, user, img, category } = req.body;
    const currentUser= await User.findOne({email: user});

    const image_cloudinary= await cloudinary.uploader.upload(img);

    const post= new Post({
          labels: labels,
          img: image_cloudinary.url,
          category: category,
          public_id: image_cloudinary.public_id,
          user: currentUser._id
    });

    await post.save();
    currentUser.posts= currentUser.posts.concat(post._id)
    await currentUser.save();

    res.status(200).json({message: 'ok'});
}


// TODO: QueryParams page and limit
const all_posts= async (req, res) =>{
    const { page= 1, limit= 3, filter }= req.query;
    let posts= [];

    if(filter === undefined){
        posts= await Post.find({}, { img: 1, public_id: 1, _id: 0 }).populate('user', { username: 1, profileImg: 1, _id: 0 }).limit((limit * 1)).skip((page - 1) * limit).sort({date: -1});
    }else{
        posts= await Post.find({category: { $regex: new RegExp(filter, 'i') } }, { img: 1, public_id: 1, _id: 0 }).populate('user', { username: 1, profileImg: 1, _id: 0 }).limit((limit * 1)).skip((page - 1) * limit).sort({date: -1});
    }

    posts.map((post) => {
        post.img= cloudinary.url(post.public_id, { flags: 'attachment' });
    });
    
    const count= await Post.countDocuments(); 

    res.status(200).json({posts, totalPages: Math.ceil(count/limit), currentPage: page});
}


module.exports= {
    registro_post,
    all_posts
};