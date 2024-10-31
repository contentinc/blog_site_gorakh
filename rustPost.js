require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

const rustPost = {
    title: "Getting Started with Rust 🦀",
    content: `# Getting Started with Rust 🦀

## What is Rust?

Rust is a systems programming language that focuses on safety, concurrency, and performance. Created by Mozilla Research, it's designed to be memory-efficient and thread-safe.

## Why Learn Rust?

1. **Memory Safety**: Rust guarantees memory safety without using a garbage collector
2. **Zero-Cost Abstractions**: High-level features with no runtime overhead
3. **Modern Tooling**: Excellent package manager (Cargo) and documentation tools
4. **Growing Ecosystem**: Active community and increasing adoption in industry

## Setting Up Your Environment

### 1. Install Rust

\`\`\`bash
# On macOS, Linux, or WSL:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Verify installation
rustc --version
cargo --version
\`\`\`

### 2. Your First Rust Program

Create a new file \`hello.rs\`:
\`\`\`rust
fn main() {
    println!("Hello, Rust! 🦀");
}
\`\`\`

Compile and run:
\`\`\`bash
rustc hello.rs
./hello
\`\`\`

## Using Cargo (Rust's Package Manager)

Create a new project:
\`\`\`bash
cargo new hello_cargo
cd hello_cargo
\`\`\`

Your project structure will look like:
\`\`\`
hello_cargo/
├── Cargo.toml
└── src/
    └── main.rs
\`\`\`

### Building and Running

\`\`\`bash
# Build your project
cargo build

# Run your project
cargo run
\`\`\`

## Key Concepts to Learn Next

1. Variables and Mutability
2. Data Types
3. Functions
4. Control Flow
5. Ownership System

## Practice Exercise

Try creating a simple temperature converter:

\`\`\`rust
fn main() {
    let celsius = 23.0;
    let fahrenheit = celsius_to_fahrenheit(celsius);
    
    println!("{}°C is {}°F", celsius, fahrenheit);
}

fn celsius_to_fahrenheit(c: f64) -> f64 {
    (c * 9.0/5.0) + 32.0
}
\`\`\`

## Resources for Learning

- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings/)

---

*Next post: Variables, Data Types, and Mutability in Rust*`
};

async function createRustPost() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const post = new Post(rustPost);
        await post.save();
        console.log('Rust post created successfully');

        const posts = await Post.find();
        console.log('All posts:', posts);

        await mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

createRustPost();
