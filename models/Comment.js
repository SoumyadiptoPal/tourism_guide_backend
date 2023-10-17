const mongoose=require('mongoose')
const { Schema }=mongoose

const CommentSchema=new Schema({
    Author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
