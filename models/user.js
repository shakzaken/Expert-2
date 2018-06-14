const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
        
    },
    
    password: {
        type: String,
        required : true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}


module.exports.getUserByEmail = function(email,callback){
    const query = {email: email};
    User.findOne(query,callback);
}
module.exports.addUser = function(newUser,callback){
    return new Promise( (resolve,reject)=>{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err){
                    reject(err);
                } else{
                    newUser.password = hash;
                    newUser.save(callback);
                    resolve(newUser);
                } 
            });
        });
    }); 
}
module.exports.comparePassword = function(candidatePassword, hash,callback){
    bcrypt.compare(candidatePassword, hash, (err,isMatch) =>{
        if(err) throw err;
        callback(null,isMatch);
    });
}

