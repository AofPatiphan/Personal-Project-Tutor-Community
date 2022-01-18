const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/', userController.getAllUser);
router.get('/:username', userController.getUserByUsername);
router.get('/name/:name', auth, userController.getUserByName);

module.exports = router;
