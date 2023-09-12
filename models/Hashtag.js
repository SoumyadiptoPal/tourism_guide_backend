const mongoose=require('mongoose')
const { Schema }=mongoose

const HashtagSchema= new Schema({
    _id:{
        type: String,
        required: true
    },
    Contents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Post
    }]
})

const Hashtag=mongoose.model('Hashtag', HashtagSchema)
module.exports=Hashtag;