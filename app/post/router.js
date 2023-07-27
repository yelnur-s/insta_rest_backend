const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const {createPost} = require('./controllers')
const passport = require('passport')

router.post('/api/post/newPost', passport.authenticate('jwt', { session: false }), upload.single('image'),  createPost);



module.exports = router;