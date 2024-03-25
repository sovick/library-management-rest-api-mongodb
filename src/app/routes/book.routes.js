const passport = require('passport');
const router = require('express').Router();
const controller = require('../controllers/books')


router.post('/add-new',passport.authenticate('jwt',{
    session : false
}),controller.addBookToPuchaseListing);

router.get('/list/:id',passport.authenticate('jwt',{
    session : false
}),controller.getBook);


router.get('/list-all',
    passport.authenticate('jwt',{session : false}),
    controller.getAllBooksListedByUser
)

router.get('/all',
    passport.authenticate('jwt',{session : false}),
    controller.getAllBooks
);

router.post('/add-favorite',
    passport.authenticate('jwt',{session : false}),
    controller.addBookToFavorite
);

router.post('/remove-favorite',
    passport.authenticate('jwt',{session : false}),
    controller.removeBookFromFavorite
);

router.get('/most-favorites',
    passport.authenticate('jwt',{session : false}),
    controller.getMostFavoriteBooksByOrder
)

module.exports = router;