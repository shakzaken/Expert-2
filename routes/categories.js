const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const config = require('../config/database');
const BAD_REQUEST = 400;
const NOT_FOUND = 404;


router.get('/', (req, res,next) => {
    let categories = Category.find({})
    .then(categories =>{
        res.json(categories);
    })
    .catch(err =>{
        res.status(BAD_REQUEST).json("cannot get categories");
    });
});



router.post('/add',(req,res)=>{
    let category = new Category({
        name: req.body.name
    })
    .save()
    .then(category =>{
        res.json('category added');
    }).catch(err =>{
        res.status(BAD_REQUEST).json('err saving category');
    });
});  



router.delete('/:id',(req,res) =>{
    Category.remove({_id: req.params.id})
    .then(()=>{
        res.json('removed category');
    }).catch(()=>{
        res.status(NOT_FOUND).json('error deleting category');
    });
});


module.exports = router;