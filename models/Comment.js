const mongoose=require('mongoose')
const { Schema }=mongoose

const CommentSchema=new Schema({
    Owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	Description:{
		type: String
	},
    Likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps:true
})

const Comment=mongoose.model('Comment', CommentSchema)
module.exports=Comment;
