const mongoose= require('mongoose');    
const Schema= mongoose.Schema;

const postSchema = Schema({
    labels: [
        {
            type: String,
            required: true
        }
    ],
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})


module.exports= mongoose.model('post', postSchema);