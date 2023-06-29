const express = require('express');
const {signUp, signIn} = require('./controllers');
const router = express.Router();

router.post('/api/auth/signup', signUp);
router.post('/api/auth/signin', signIn);


module.exports = router;