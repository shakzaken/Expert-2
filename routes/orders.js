const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Order = require('../models/order');
const User = require('../models/user');
const config = require('../config/database');
const BAD_REQUEST = 400;
const NOT_FOUND = 404;


router.post('/', (req, res) => {

    let itemsFromClient = req.body.items;

    if(!itemsFromClient instanceof Array){
         return res.status(BAD_REQUEST).json("items is not an array");
    }

    let itemsForDb = [];
    itemsFromClient.forEach((value) =>{
        itemsForDb.push({
            book : value.id,
            quantity : value.cartQuantity
        });
    });
    
    let order = new Order({
        user: req.body.userId,
        items: itemsForDb
    })
    .save()
    .then(order =>{
        res.json('order added successfuly')
    })
    .catch(err =>{
        console.log(err);
        res.status(BAD_REQUEST).json("error saving order");
    });  
});


router.get('/', (req, res) => {

     Order.find({})
    .populate('user')
    .populate('items.book')
    .then(orders =>{
         res.json(orders);
    })
    .catch(err =>{
        console.log(err);
        res.status(BAD_REQUEST).json('error getting orders');
    });
});

router.get('/:id', (req, res) => {
 User.findOne({_id: req.params.id})
    .then(user =>{
        console.log("user ---------->",user);
        Order.find({user: user})
            .populate('user')
            .populate('items.book')
            .then(order =>{
                res.json(order);
            })
            .catch(err =>{
                console.log(err);
                res.status(NOT_FOUND).json("cant get order");
            });
    })
    .catch(err =>{
        console.log(err);
        res.status(NOT_FOUND).json("cant find user");
    });
});


router.delete('/:id', (req, res) => {
    Order.remove({_id:req.params.id})
        .then(order =>{
            return res.json("order removed successfuly");
        })
        .catch(err =>{
            console.log(err);
            return  res.status(NOT_FOUND).json("error removing order");
        });
});

module.exports = router;