
const path = require('path');
const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Category = require('../models/category');
const config = require('../config/database');
const multer = require('multer');
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const fs = require('fs');


router.get('/images/:pictureName',(req,res,next) =>{
        
    var img = fs.readFileSync(`images/books/${req.params.pictureName}`);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');    

});




router.get('/', (req, res,next) => {
     Book.find({})
    .populate('category')
    .then(books =>{
        res.json(books);      
    })
    .catch(err =>{
        console.log(err);
        res.status(BAD_REQUEST).json('error in geting the books');
    });
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/books')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
  });


let upload = multer({storage: storage});

router.post('/img', upload.single('myfile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  
  let fileName =  req.file.filename;
  insertBookToDb(req,res,fileName);

});

/*
function populateImages(books){
    return new Promise((resolve,reject)=>{
        newBooks = [];
        books.forEach(book =>{
            if(book.pictureName){
                
                 fs.readFile(`./images/books/${book.pictureName}`,(err,data)=>{
                    book.image = data;
                    newBooks.push({
                        name: book.name,
                        price:book.price,
                        quantitiy:book.quantity,
                        image:book.image,
                        category: book.category,
                        pictureName: book.pictureName
                    });
                });
            }else{
                newBooks.push(book);
            }  
        });
        setTimeout(()=>{
            resolve(newBooks);
        },2000);
        
    }); 
}
*/


/*
router.post('/add',(req,res)=>{
  Category.findOne({ _id: req.body.category })
    .then(category =>{
        let book = new Book({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            pictureUrl : req.body.pictureUrl,
            category: category._id
            })
            .save()
            .then(res2 =>{
                return res.json('book added');
                
            })
            .catch(err2 =>{
                console.log(err2);
                return res.status(BAD_REQUEST).json('cannot save book');
            });
            
    })
    .catch(err =>{
        return res.status(NOT_FOUND).json('cannot find category');
    });
});                

*/

router.delete('/:id',(req,res) =>{
    Book.remove({_id: req.params.id})
        .then(()=>{
            res.json('removed book');
        }).catch(()=>{
            res.status(BAD_REQUEST).json('error deleting book');
        });
});


function insertBookToDb(req,res,fileName){
    Category.findOne({ _id: req.body.category })
    .then(category =>{
        let book = new Book({
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            quantity: Number(req.body.quantity),
            pictureName : fileName,
            category: category._id
            })
            .save()
            .then(res2 =>{
                return res.json('book added');
                
            })
            .catch(err2 =>{
                console.log(err2);
                return res.status(BAD_REQUEST).json('cannot save book');
            });
            
    })
    .catch(err =>{
        return res.status(NOT_FOUND).json('cannot find category');
    });
}



module.exports = router;


