const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const multer = require('multer');


mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log(`connected to database ${config.database}`);
});
mongoose.connection.on('error',(err)=>{
    console.log(`database err ${err}`);
});
const app = express();

const users = require('./routes/users');
const categories = require('./routes/categories');
const books = require('./routes/books');
const orders = require('./routes/orders');

const port = config.port;

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('./files'));


app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);
app.use('/categories',categories);
app.use('/books',books);
app.use('/orders',orders);


app.get('/',(req,res) =>{
    res.send('INValid EndPoint');
});

app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'public/index.html'))
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
