
const router = require('express').Router();
const controller = require('../controllers/auth');

router.post('/register',controller.registerSimpleUser);
router.post('/login',controller.loginSimpleUser);
router.get('/verify',controller.verifySimpleUser);

module.exports = router;