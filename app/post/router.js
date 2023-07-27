const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const {createPost, getAllUserPosts, getAllUsersPosts, getPostByID, deletePostByID} = require('./controllers')
const passport = require('passport')

router.post('/api/post/newPost', passport.authenticate('jwt', { session: false }), upload.single('image'),  createPost);
router.get('/api/post/getAllUserPosts', passport.authenticate('jwt', { session: false }), getAllUserPosts);
router.get('/api/post/getAllUsersPosts', passport.authenticate('jwt', { session: false }), getAllUsersPosts);
router.get('/api/post/getPostByID/:id', passport.authenticate('jwt', { session: false }), getPostByID);
router.delete('/api/post/deletePostByID/:id', passport.authenticate('jwt', { session: false }), deletePostByID);



module.exports = router;