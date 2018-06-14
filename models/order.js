
const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items:[{
        book:{
            type: Schema.Types.ObjectId,
            ref: 'books'
        },
        quantity: {
            type: Number,
            required: true
        }
    }] 
});

const Order = module.exports = mongoose.model('orders',OrderSchema);