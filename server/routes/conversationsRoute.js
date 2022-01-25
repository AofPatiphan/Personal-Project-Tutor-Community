const express = require('express');
const passport = require('passport');

const router = express.Router();
const conversationController = require('../controllers/conversationController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.post('/', auth, conversationController.createConversation);

module.exports = router;
