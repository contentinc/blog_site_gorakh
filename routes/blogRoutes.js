const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts (titles only)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: 'desc' });
        res.render('index', { posts });
    } catch (err) {
        res.status(500).render('error', { error: err.message });
    }
});

// Get single post
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).render('error', { error: 'Post not found' });
        }
        res.render('post', { post });
    } catch (err) {
        res.status(500).render('error', { error: err.message });
    }
});

// Show create post form
router.get('/create', (req, res) => {
    res.render('create-post');
});

// Create new post
router.post('/create', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        });
        await post.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).render('error', { error: err.message });
    }
});

module.exports = router;
