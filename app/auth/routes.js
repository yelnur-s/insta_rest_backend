const express = require('express');
const {signUp, signIn, editUser} = require('./controllers');
const router = express.Router();
const passport = require('passport')

router.post('/api/auth/signup', signUp);
router.post('/api/auth/signin', signIn);
router.put('/api/auth/editUser', passport.authenticate('jwt', { session: false }),  editUser);


module.exports = router;