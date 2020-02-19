const express = require('express');
const router = express.Router();
const Post = require('../models/Posts')

//gets all posts
router.get('/', async (req, res) => {
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

})

//delete a sapecific post
router.delete('/:postId', async (req, res) => {
    try {
        const remPost = await Post.remove({ _id: req.params.postId });
        res.json(remPost);
    }
    catch (err) {
        res.json({ message: err });
    }
})

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
})
module.exports = router;
