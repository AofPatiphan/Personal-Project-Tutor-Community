const express = require('express');
const passport = require('passport');

const router = express.Router();
const postController = require('../controllers/postController');
// const authController = require('../controllers/authController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/all', postController.getAllPost);
router.get('/', auth, postController.getFriendPost);
// router.get('/', auth, postController.getPost);
router.get('/:username', postController.getPostById);
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/like/:id', auth, postController.likePost);
router.delete('/like/:id', auth, postController.unLikePost);

module.exports = router;
