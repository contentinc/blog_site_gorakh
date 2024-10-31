require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

async function createTestPost() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const testPost = new Post({
            title: 'Test Post',
            content: '# This is a test post\n\nTesting markdown rendering.'
        });

        await testPost.save();
        console.log('Test post created successfully');

        const posts = await Post.find();
        console.log('All posts:', posts);

        await mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

createTestPost();
