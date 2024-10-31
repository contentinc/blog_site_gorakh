const mongoose = require('mongoose');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

marked.setOptions({
    breaks: true,
    gfm: true
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

postSchema.pre('validate', function(next) {
    if (this.content) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.content));
    }
    next();
});

module.exports = mongoose.model('Post', postSchema);
