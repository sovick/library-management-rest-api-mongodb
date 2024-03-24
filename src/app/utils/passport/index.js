const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const UserModel = require('../../db/models/user.model');
const { JWT_SECRET } = require('../../../config');

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : JWT_SECRET 
},async function(jwtPayload,cb){
    try{

        const user = await UserModel.findOne({
            _id : jwtPayload._id
        })

        if(!user){
            cb(null, false);
        }else{
            cb(null,user);
        }

    }catch(e){
        cb(null,e);

    }
}));