const express = require('express');
const passport = require('passport');

const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/', commentController.getAllComment);
router.get('/:id', commentController.getCommentById);
router.post('/:id', commentController.createComment);
router.put('/:id', auth, commentController.updateComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;
