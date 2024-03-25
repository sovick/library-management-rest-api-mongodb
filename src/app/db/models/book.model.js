const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    listedBy : {
        type : mongoose.ObjectId
    }

},{
    timestamps : true
})

const BookModel = mongoose.model('Book',bookSchema);

module.exports = BookModel;