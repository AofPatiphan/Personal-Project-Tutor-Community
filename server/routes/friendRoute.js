const express = require('express');
const passport = require('passport');

const router = express.Router();
const friendController = require('../controllers/friendController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/', auth, friendController.getAll);
router.get('/:id', auth, friendController.getRequest);
router.get('/:id1/:id2', auth, friendController.getById);
// router.get('/mutualfriend/:id1/:id2', auth, friendController.getMtFriend);
router.post('/', auth, friendController.request);
router.put('/:id1/:id2', auth, friendController.acceptRequest);
router.delete('/:id1/:id2', auth, friendController.cancelRequest);

module.exports = router;
