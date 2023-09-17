const express = require('express');
const app = express.Router();

const User = require('../models/User');

app.post('/register', (req,res) => {
    const {_id,Name,Password} = req.body;
    try {
        if (_id && Name && Password) {
            User.findOne({_id: _id})
            .then(user => {
                if (user) {
                    res.status(400).json({errorMessage: 'User already exists', status: false});
                }
                else {
                    User.create(req.body)
                    .then(user => res.json({title: 'User added successfully'}))
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
    } catch (e) {
        console.log(e);
        res.status(500).json({
            errorMessage: 'There was an error in Registration',
            status: false
        });
    }
});

app.post('/login', (req,res) => {
    const {_id,Password} = req.body;
    try {
        if (_id && Password) {
            User.findOne({_id: _id})
            .then(user => {
                if (user) {
                    if (user.Password == Password) res.json({title: 'Logged in successfully'});
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

module.exports = app;