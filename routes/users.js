const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

router.post('/register', (req, res , next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }); 

    User.find({email: req.body.email})
        .then(users =>{
            if(users.length > 0){
                return res.status(BAD_REQUEST).json({type:'email',msg:"Email already Exists"});
            }else{
                 User.addUser(newUser)
                .then(newUserAdded =>{
                    res.json({msg:'user registered'});
                })
                .catch(err =>{
                    console.log(err);
                    res.status(BAD_REQUEST).json({type:'email', msg:'Failed to register user'});
                });
            }   
        }).catch(err =>{
            console.log(err);
            return res.status(BAD_REQUEST).json({type:'email', msg:"Error cheking for email"});
        });
     
});

router.post('/authenticate', (req, res , next) => {
    // const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    User.getUserByEmail(email, (err,user) =>{
        if(err) throw err;
        if(!user) {
            return  res.status(NOT_FOUND).json({msg:'Email not found',type:'email-error'});
        }

        User.comparePassword(password,user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                console.log(user);
                const token = jwt.sign({data:user},config.secret , {
                   expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'Bearer '+token,
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }
                });
            }else{
                return  res.status(BAD_REQUEST).json({msg:'Wrong password',type:'password-error'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt',{session:false}),(req, res) => {
    res.json({user: req.user});
});

router.get('/',(req,res) =>{
         User.find({})
        .then(users =>{
             res.json(users);
        });
});


router.delete('/:id',(req,res) =>{
    User.remove({_id: req.params.id})
        .then((user)=>{
            res.json({success: true, msg:'removed user'});
        }).catch((err)=>{
            console.log(err);
            res.status(BAD_REQUEST).json({success: false,msg:'error deleting user'});
        });
});



module.exports = router;