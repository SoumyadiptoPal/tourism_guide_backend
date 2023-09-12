const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Nationality:{
        type: String,
        required: false
    },
    Profile_Pic:{
        type:String,
        required: true,
        default:'images/profile.jpg'
    },
    Followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
    Following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
  });
  const User = mongoose.model('User', UserSchema);
  module.exports = User;