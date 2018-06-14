const mongoose = require('mongoose');
const config = require('../config/database');

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    }
    
});

const Category = module.exports = mongoose.model('categories',CategorySchema);


    
