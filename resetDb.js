require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

async function resetDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Delete all existing posts
        await Post.deleteMany({});
        console.log('All posts deleted');

        // Create new Rust post
        const rustPost = new Post({
            title: "Getting Started with Rust 🦀",
            content: `# Getting Started with Rust

## What is Rust?

Rust is a systems programming language that focuses on safety, concurrency, and performance. Created by Mozilla Research, it's designed to be memory-efficient and thread-safe.

## Why Learn Rust?

1. **Memory Safety**: Rust guarantees memory safety without using a garbage collector
2. **Zero-Cost Abstractions**: High-level features with no runtime overhead
3. **Modern Tooling**: Excellent package manager (Cargo) and documentation tools
4. **Growing Ecosystem**: Active community and increasing adoption in industry

## Key Concepts

- Variables and Mutability
- Data Types
- Functions
- Control Flow
- Ownership System

## Example Code

\`\`\`rust
fn main() {
    println!("Hello, Rust! 🦀");
}
\`\`\`

## Resources

- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings/)
`
        });

        await rustPost.save();
        console.log('New Rust post created');

        await mongoose.connection.close();
        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    }
}

resetDatabase();
