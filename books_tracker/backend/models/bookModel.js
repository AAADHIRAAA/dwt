const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    _id:String,
    title: String,
    pages_scanned: Number,
    ID_url:String,
    author_name: String,
    publisher_name: String,
    year:Number,
    total_pages: Number ,
    scanned_at: { type: Date, default: Date.now  },
    updated_at: { type: Date, default:  Date.now },
    userId:String,
});



const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
