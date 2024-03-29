const express = require('express');
const app = express.Router();
const Post = require('../models/Post');
const requireLogin = require('../middleware/requireLogin'); 
const Comment = require('../models/Comment');

app.put('/create', requireLogin, async (req,res) => {
	const {Title,Description,Picture} = req.body;
	try {
		if (Title && Description) {
			Post.create({
				Owner_id: req.user._id, 
				Title: Title,
				Description: Description,
				Picture: Picture
			})
			.then(post => {
				res.json({title: 'Post added successfully', status: true})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					errorMessage: 'Failed to upload post', 
					status: false
				});
			});
		}
		else {
			res.status(400).json({
				errorMessage: 'Please fill all the details',
				status: false
			});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({
			errorMesssage: 'There was an error while posting',
			status: false
		});
	}
});

// GET the latest 100 posts
app.get('/', requireLogin, async (req,res) => {
	try {
		const posts = await Post.find()
		.sort({createdAt: -1})
		.limit(100)
		.populate("Owner_id","-Password")
		.populate("Likes")
		.populate("Comments")
		.then(posts => {
			res.json({posts: posts, status: true});
		})
	} catch (err) {
		console.log(err);
		res.status(500).json({
			errorMessage: 'There was an error while fetching posts',
			status: false
		});
	}
});

// Like Post
app.post('/like', requireLogin, async (req,res) => {
	try {
        const postData = await Post.findById(req.body._id);
        const liked = postData['Likes'].some((obj) => obj.equals(req.user._id));
        const query = (!liked) ? { $push : { Likes: req.user._id } } : { $pull : { Likes: req.user._id } }; 
        console.log(liked); 
		Post.findByIdAndUpdate(req.body._id,query)
		.then(post => {
			res.json({title: 'Post liked successfully', status: true});
		})
	} catch (err) {
		console.log(err);
		res.status(500).json({
			errorMessage: 'There was an error while processing request',
			status: false
		});
	}
});

app.post('/comment', requireLogin, async (req,res) => {
	try {
		Comment.create({
			Owner_id: req.user._id,
			Description: req.body.Description
		})
		.then(comment => {
			Post.findByIdAndUpdate(req.body._id, {
				$push : { Comments: comment._id }
			})
			.then(post => {
				res.json({title: 'Commented successfully', status: true});
			});	
		})	
	} catch (err) {
		console.log(err);
		res.status(500).json({
			errorMessage: 'There was an error while processing request',
			status: false
		});
	}
});

app.get('/getallposts',requireLogin, async(req,res)=>{
    const response=Post.find({["Owner_id"]:req.query._id})
	.then(posts=>{
		res.json({posts: posts, status: true})
	})
	.catch(error=>{
		console.log("Error in fetching", error)
		res.status(500).json({
			errorMessage: 'There was an error while processing request',
			status: false
		});
	})
})
module.exports = app;
	
