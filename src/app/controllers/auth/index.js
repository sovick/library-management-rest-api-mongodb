const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../db/models/user.model');

const { JWT_SECRET } = require('../../../config');

const registerSimpleUser = async(req,res)=>{
    try{

        const { email, password } = req.body;

        // check if the user already exists 
        const user = await UserModel.findOne({
            email
        });

        if(user){
            return res.status(409).json({
                status : "error",
                message : "user already exists"
            });
        }

        const newUser = await UserModel.create({
            email, 
            password
        });

        return res.status(201).json({
            status : "success",
            user : newUser
        })

    }catch(e){
        return res.status(500).json({
            status : "error",
            message : "server error"
        });
    }

}

const loginSimpleUser = async (req,res)=>{
    try{

        const { email, password } = req.body;

        //check if user exists
        const user = await UserModel.findOne({
            email 
        });

        if(!user){
            return res.status(409).json({
                status : "error",
                message : "user does not exist"
            });
        }

        // check if the password matches
        const doesPasswordMatches = await bcrypt.compare(password,user.password);

        if(doesPasswordMatches){

            // Create a new token for the user.
            
            const token = jwt.sign({
                _id : user._id,
                email : user.email
            },JWT_SECRET,{
                expiresIn : '1h'
            });

            return res.status(200).json({
                status : "success",
                token
            });

        }else{
            return res.status(409).json({
                status : "error",
                message : "Please provide correct password"
            })
        }

    }catch(e){
        return res.status(500).json({
            status : "error",
            message : "server error"
        });
    }
}

module.exports = {
    registerSimpleUser,
    loginSimpleUser
}