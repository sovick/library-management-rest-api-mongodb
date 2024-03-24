const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {  SALT_ROUNDS }  = require('../../../config');

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
    },
    role : {
        type : String,
        required : true,
        enum : ['user','admin'],
        default: 'user'
    }
},{
    timestamps : true
})

userSchema.pre('save',async function (next){
    const user = this;
    const genSalt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(user.password,genSalt);
    user.password = hashedPassword;
})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;