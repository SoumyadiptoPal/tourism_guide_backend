const express = require('express');
const app = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const saltRounds = 10;
const jwt_secret = config.get('secret');
const requireLogin = require('../middleware/requireLogin');

app.post('/register', async (req,res) => {
    const {Email,Name,Password} = req.body;
    //console.log(Profile_Pic);
    try {
        if (Email && Name && Password) {
            // const salt = bcrypt.genSalt(saltRounds);
            const secPass = await bcrypt.hash(req.body.Password,saltRounds);
            User.findOne({Email: Email})
            .then(user => {
                if (user) {
                    res.status(400).json({errorMessage: 'User already exists', status: false});
                }
                else {
                    User.create({
						Email: Email,
                        Name: Name,
                        Password: secPass
                    })
                    .then(user => {
                        const token = jwt.sign({_id:user._id},jwt_secret);
                        res.json({
                            title: 'Logged in successfully',
                            token: token,
                            userId: user._id,
                            user: user,
                            status: true
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({errorMessage: 'Registration Failed',status: false});
                    });
                }
            });
        }
        else {
            res.status(400).json({
                errorMessage: `Please fill all the details`,
                status: false
            });
        }
    } catch (e) {alert(err.response.data.errorMessage);
        console.log(e);
        res.status(500).json({
            errorMessage: 'There was an error in Registration',
            status: false
        });
    }
});

app.post('/login', async (req,res) => {
    const {Email,Password} = req.body;
    try {
        if (Email && Password) {
            User.findOne({Email: Email})
            .then(async user => {
                if (user) {
                    const passwordCompare = await bcrypt.compare(Password, user.Password);
                    if (passwordCompare) {
                        const token = jwt.sign({_id:user._id},jwt_secret);
                        res.json({
                            title: 'Logged in successfully',
                            token: token,
                            userId: user._id,
                            user: user,
                            status: true
                        })
                        //res.json({title: 'Logged in successfully', status: true});
                    }
                    else res.status(400).json({
                        errorMessage: 'Invalid Credentials',
                        status: false
                    })
                }
                else {
                    res.status(404).json({
                        errorMessage: 'User not found',
                        status: false
                    })
                }
            });
        }
        else {
            res.status(400).json({
                errorMessage: `Please fill all the details`,
                status: false
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            errorMessage: 'There was an error in Login',
            status: false
        });
    }
});

app.get('/protected',requireLogin,async (req,res) => {
    console.log('Authorization successful');
    res.json({
        title: "Authorization Successful",
        status: false
    });
});

module.exports = app;
