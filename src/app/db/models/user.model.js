const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
    },
    username : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;