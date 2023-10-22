const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new Schema({
    Email:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Profile_Pic:{
        type: String,
        required: true,
        default:'images/profile.jpg'
    },
    Nationality:{
        type: String,
        required: false
    },
    Followers:[{
        type: ObjectId,
        ref: 'User'
    }],
    Following:[{
        type: ObjectId,
        ref: 'User'
    }]
  });

const User = mongoose.model('User', UserSchema);
module.exports = User;
