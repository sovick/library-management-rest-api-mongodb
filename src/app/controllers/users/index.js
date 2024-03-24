const UserModel = require('../../db/models/user.model');

// Update user Details
const updateUser = async(req,res)=>{
    try{

        const { username, fullname } = req.body;

        await UserModel.updateOne({
            _id : req.user._id
        },{
            username,
            name : fullname
        });

        return res.status(200).json({
            status : "success"
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : "error",
            message : "server error"
        });
    }

}

const getUser = async(req,res)=>{

    try{

        const user = await UserModel.findOne({
            _id : req.user._id
        },{
            password : 0,
            createdAt : 0,
            updatedAt : 0
        });

        return res.status(200).json({
            status : "success",
            user : user
        })

    }catch(e){
        return res.status(500).json({
            status : "errror",
            message : "server error"
        });
    }


}


module.exports = {
    updateUser,
    getUser
}