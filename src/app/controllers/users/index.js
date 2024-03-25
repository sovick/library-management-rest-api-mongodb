const UserModel = require('../../db/models/user.model');
const BookModel = require('../../db/models/book.model');

// Update user Details
const updateUser = async(req,res)=>{
    try{

        const { username, fullname } = req.body;

        await UserModel.updateOne({
            _id : req.user._id
        },{
            'username' : username,
            'name' : fullname
        });

        return res.status(200).json({
            status : "success",
            message : "user details saved successfully"
        })

    }catch(e){
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
            _id     : 1,
            email   : 1,
            name    : 1,
            username : 1
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

const getFavoriteBooks = async(req,res)=>{
    try{

        const userId = req.user._id;

        const favoriteBooks = await UserModel.findOne({
            _id : userId 
        },{
            favoriteBooks : 1
        }).populate('favoriteBooks',{
            name : 1,
            price : 1,
            author : 1,
            quantity : 1
        });

        return res.status(200).json({
            status : "success",
            bookList : favoriteBooks
        })

    }catch(e){
        return res.status(500).json({
            status : "error",
            message : "server error"
        })
    }
}


module.exports = {
    updateUser,
    getUser,
    getFavoriteBooks
}