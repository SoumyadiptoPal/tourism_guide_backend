const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const config = require('config');
const jwt_secret = config.get('secret');

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        console.log("Not authorized.")
        return res.status(401).json({
            errorMessage:"You must be logged in!",
            status:false
        });       
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,jwt_secret,(err,payload) => {
        if (err) {
            console.log(err);
            return res.status(401).json({
                errorMessage:"You must be logged in!",
                status:false
            });
        }

        const {_id} = payload;
        User.findById(_id)
        .then((userdata) => {
            req.user = userdata
        })
        next();
    })
}