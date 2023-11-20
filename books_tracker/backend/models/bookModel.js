const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    
    title: String,
    pages_scanned: Number,
    ID_url:String,
    author_name: String,
    publisher_name: String,
    year:Number,
    isbn:String,
    language:String,
    scribe_number:String,
    userId:String,
    userName:String,
    scanned_at: { type: Date, default: Date.now  },
    updated_at: { type: Date, default:  Date.now },
    
});



const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
