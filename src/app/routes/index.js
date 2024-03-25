const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const bookRoutes = require('./book.routes');

router.use('/auth',authRoutes);
router.use('/users',userRoutes);
router.use('/books',bookRoutes);

module.exports = router;