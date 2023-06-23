const express = require('express');
const {signUp} = require('./controllers');
const router = express.Router();

router.post('/api/auth/signup', signUp);


module.exports = router;