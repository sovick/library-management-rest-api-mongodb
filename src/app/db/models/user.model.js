const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, JWT_SECRET }  = require('../../../config');

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
    },
    verification: {
        isVerified : {
            type : Boolean,
            default : false
        },
        token : {
            type : String
        },
        verifiedAt : {
            type : Date
        }
    },
    favoriteBooks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book'
    }]
},{
    timestamps : true
})

userSchema.pre('save',async function (next){
    const user = this;
    const genSalt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(user.password,genSalt);
    user.password = hashedPassword;

    const verificationToken = jwt.sign({
        _id  : user._id
    },JWT_SECRET,{
        expiresIn : 60 * 5
    })

    user.verification.token = verificationToken;

})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;