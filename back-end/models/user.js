const mongoose= require('mongoose');
const Schema= mongoose.Schema;



const userSchema= new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImg: {
        type: String,
        required: false
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
});


module.exports= mongoose.model('user', userSchema);