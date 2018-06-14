
const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;

const BookSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    pictureName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'categories'
    }
    
});

const Book = module.exports = mongoose.model('books',BookSchema);