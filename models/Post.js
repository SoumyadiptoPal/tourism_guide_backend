const mongoose=require('mongoose');
const {Schema}=mongoose

const PostSchema=new Schema({
    Picture:[{
        type: String
    }],
    Description:{
        type: String,
		required: true
    },
    Title:{
        type: String,
		required: true
    },
	Tags:[{
		type: String
	}],
    Owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    Comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
