const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/users');

router.post('/update',passport.authenticate('jwt',{session : false}),controller.updateUser);

router.get('/details',passport.authenticate('jwt',{session : false}),controller.getUser);

router.get('/favorites',passport.authenticate('jwt',{session : false}),controller.getFavoriteBooks);

module.exports = router;