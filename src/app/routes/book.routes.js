const passport = require('passport');
const router = require('express').Router();
const controller = require('../controllers/books')


router.post('/add-new',passport.authenticate('jwt',{
    session : false
}),controller.addBookToPuchaseListing);

router.get('/list/:id',passport.authenticate('jwt',{
    session : false
}),controller.getBook);


module.exports = router;