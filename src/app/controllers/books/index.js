const BookModel = require('../../db/models/book.model');
const UserModel = require('../../db/models/user.model');

const { PAGINATION_SIZE } = require('../../../config');

const addBookToPuchaseListing = async(req, res)=>{
    try{

        const { name, author, price, quantity } = req.body;

        const listedBy = req.user._id;


        const bookExists = await BookModel.findOne({
            name,
            listedBy
        });

        if(bookExists){
            return res.status(409).json({
                status : "error",
                message : "book entry already exists for the user"
            })
        }
        
        const newBook = new BookModel({
            name,author,price, quantity,listedBy
        });

        await newBook.save();

        return res.status(200).json({
            status : "success",
            msessage : "new book listing done"
        });

    }catch(e){
        return res.status(500).json({
            status : "error",
            message : "server error"
        })
    }
};


const getBook = async(req,res)=>{
    try{

        const listedBy = req.user._id;
        const { id } = req.params;

        const bookInfo = await BookModel.findOne({
            listedBy,
            _id : id
        },{
            createdAt : 0,
            updatedAt : 0
        }).populate('listedBy',{
            verification : 0,
            password : 0,
            createdAt : 0,
            updatedAt : 0,
            role : 0
        });

        return res.status(200).json({
            status : "success",
            bookInfo
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : "error",
            message : "server error"
        });
    }
}

const getAllBooksListedByUser = async(req,res)=>{
    try{

        const { page : currentPage } = req.query;
        const listedBy = req.user._id;

        const pageSize = PAGINATION_SIZE;
        const pageNo = currentPage * pageSize // default currentPage = 0

        const bookList = await BookModel.find({
            listedBy
        },{
            listedBy : 0,
            createdAt : 0,
            updatedAt : 0,
            __v : 0
        })
        .limit(pageSize)
        .skip(pageNo);

        return res.status(200).json({
            status : "success",
            books : bookList
        });

    }catch(e){
        return res.status(500).json({
            status : 'error',
            message : 'server error'
        })
    }
}

const getAllBooks = async(req,res)=>{
    try{

        const { page : currentPage } = req.query;

        const pageSize = PAGINATION_SIZE;
        const pageNo = currentPage * pageSize // default currentPage = 0

        const bookList = await BookModel.find({},{
            listedBy : 0,
            createdAt : 0,
            updatedAt : 0,
            __v : 0
        })
        .limit(pageSize)
        .skip(pageNo);

        return res.status(200).json({
            status : "success",
            books : bookList
        });

    }catch(e){
        return res.status(500).json({
            status : 'error',
            message : 'server error'
        })
    }
}


const addBookToFavorite = async(req,res)=>{
    try{

        const { bookId } = req.body;

        const userId = req.user._id;

        // Check if the book-id exists

        const bookInfo = await BookModel.findOne({
            _id : bookId
        });

        if(!bookInfo){
            return res.status(409).json({
                status : 'error',
                message : 'book details not found'
            });
        }

        // check if the book is added already to the list of favorites
        const bookAlreadyAddedToFav = await UserModel.findOne({
            _id : userId,
            favoriteBooks : bookId
        },{
            favoriteBooks : 1 
        });

        if(bookAlreadyAddedToFav){
            return res.status(409).json({
                status : "error",
                message : "book details already exists"
            })
        }
        

        await UserModel.updateOne({
            _id : userId
        },{
            $push : {
                favoriteBooks : bookId
            }
        });

        await BookModel.updateOne({
            _id: bookId
        },{
            $inc : {
                likedBy : 1
            }
        })

        return res.status(200).json({
            status : "success",
            message : 'book added to favorites'
        })


    }catch(e){
        return res.status(500).json({
            status : "error",
            message : "server error"
        })
    }
}

const removeBookFromFavorite = async(req,res)=>{
    try{

        const { bookId } = req.body;
        const userId = req.user._id;

        // Check if the book-id exists

        const bookInfo = await BookModel.findOne({
            _id : bookId
        });

        if(!bookInfo){
            return res.status(409).json({
                status : 'error',
                message : 'book details not found'
            });
        }

        // check if the book exists in the list of favorites
        const bookExistsInFav = await UserModel.findOne({
            _id : userId,
            favoriteBooks : bookId
        },{
            favoriteBooks : 1 
        });

        if(!bookExistsInFav){
            return res.status(409).json({
                status : "error",
                message : "book details doesn't exists"
            })
        }

        await UserModel.updateOne({
            _id : userId
        },{
            $pull : {
                favoriteBooks : bookId
            }
        });

        await BookModel.updateOne({
            _id: bookId
        },{
            $inc : {
                likedBy : -1
            }
        })

        return res.status(200).json({
            status : "success",
            message : "book removed from favorites"
        });

    }catch(e){
        return res.status(500).json({
            status : "error",
            message : "server error"
        })
    }
}


// Get the Details of favorite Books by order
const getMostFavoriteBooksByOrder = async(req,res)=>{
    try{

        const { page : currentPage } = req.query;

        const pageSize = PAGINATION_SIZE;
        const pageNo = currentPage * pageSize // default currentPage = 0

        const bookList = await BookModel.find({},{
            _id : 1,
            name : 1,
            price : 1,
            quantity : 1,
            author : 1,
            likedBy : 1
        })
        .limit(pageSize)
        .skip(pageNo)
        .sort([['likedBy',-1]]);

        return res.status(200).json({
            status : "success",
            books : bookList
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : 'error',
            message : 'server error'
        })
    }


}

module.exports = {
    addBookToPuchaseListing,
    getBook,
    getAllBooksListedByUser,
    getAllBooks,
    addBookToFavorite,
    removeBookFromFavorite,
    getMostFavoriteBooksByOrder
}