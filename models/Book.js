const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        min: 0
    },
    published_on: {
        type: Date,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('Book', bookSchema);
