const express = require('express');
const passport = require('passport');

const router = express.Router();
const aboutController = require('../controllers/aboutController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/:id', aboutController.getAboutById);
router.post('/', auth, aboutController.createAbout);
router.put('/:id', auth, aboutController.updateAbout);

module.exports = router;

module.exports = router;
