const BookModel = require('../../db/models/book.model');

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





module.exports = {
    addBookToPuchaseListing
}