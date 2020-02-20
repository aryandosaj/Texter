const express = require('express');
const router = express.Router();
const Post = require('../models/Posts')
const { createToken, checkToken } = require('../auth');

//gets all posts
router.get('/', async (req, res) => {
    var token = req.headers.token;
    var retrieved_email=null;
    console.log(token);
    if (token) {
        checkToken(token,function(email){
            console.log(email);
            if(email)
                retrieved_email = email;
        });
    }
    if(retrieved_email)
    {
        try {
            const posts = await Post.find();
            res.json(posts);
        } catch (err) {
            res.json({
                message: err
            });
        }
    }
    else 
        res.json({ message: 'Login first' });
    
});

// submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch (err) {
        res.json({
            message: err
        });
    }

});


//find a specific post

router.get('/:postId', async (req, res) => {
    // console.log(req.params.postId);
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }

});

//delete a sapecific post
router.delete('/:postId', async (req, res) => {
    try {
        const remPost = await Post.remove({ _id: req.params.postId });
        res.json(remPost);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedpost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedpost);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;
