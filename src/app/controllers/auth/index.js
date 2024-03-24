const UserModel = require('../../db/models/user.model');

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

module.exports = {
    registerSimpleUser
}