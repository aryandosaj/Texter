const express = require('express');
const router = express.Router();
const Post = require('../models/Posts')
const { createToken, checkToken } = require('../auth');

//gets all posts
router.get('/', async (req, res) => {
    var token = req.headers.token;
    var retrieved_email = null;
    if (token)
        checkToken(token, function (email) {
            retrieved_email = email;
        });
    if (!retrieved_email)
        return res.json({ message: 'Login first' });

    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// submit a post
router.post('/', async (req, res) => {
    var token = req.headers.token;
    var retrieved_email = null;
    if (token)
        checkToken(token, function (email) {
            retrieved_email = email;
        });
    if (!retrieved_email)
        return res.json({ message: 'Login first' });
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        authorUsername: req.body.authorUsername

    });
    console.log(post);
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
    var token = req.headers.token;
    var retrieved_email = null;
    if (token)
        checkToken(token, function (email) {
            retrieved_email = email;
        });
    if (!retrieved_email)
        return res.json({ message: 'Login first' });
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }

});

//delete a sapecific post
router.delete('/:postId', async (req, res) => {
    var token = req.headers.token;
    var retrieved_email = null;
    if (token)
        checkToken(token, function (email) {
            retrieved_email = email;
        });
    if (!retrieved_email)
        return res.json({ message: 'Login first' });
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
    var token = req.headers.token;
    var retrieved_email = null;
    if (token)
        checkToken(token, function (email) {
            retrieved_email = email;
        });
    if (!retrieved_email)
        return res.json({ message: 'Login first' });
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
