const mongoose=require('mongoose');
const {Schema}=mongoose

const PostSchema=new Schema({
    Picture:[{
        type: String
    }],
    Description:{
        type: String
    },
    City:{
        type: String,
        require: true
    },
    Review_Type:{
        type: String,
        require: true
    },
    Name:{
        type: String
    },
    Rating:{
        type: Number,
        require: true
    },
    Owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    Likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
    Comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Comments
    }]
},{
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema);
  module.exports = Post;