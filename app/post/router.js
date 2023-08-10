const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const {createPost, getAllUserPosts, getAllUsersPosts, getPostByID, deletePostByID, editPost} = require('./controllers')
const passport = require('passport')

router.post('/api/post/newPost', passport.authenticate('jwt', { session: false }), upload.single('image'),  createPost);
router.put('/api/post/editPost', passport.authenticate('jwt', { session: false }), upload.single('image'), editPost)
router.delete('/api/post/deletePostByID/:id', passport.authenticate('jwt', { session: false }), deletePostByID);
router.get('/api/post/getAllUserPosts', passport.authenticate('jwt', { session: false }), getAllUserPosts);
router.get('/api/post/getAllUsersPosts', passport.authenticate('jwt', { session: false }), getAllUsersPosts);
router.get('/api/post/getPostByID/:id', passport.authenticate('jwt', { session: false }), getPostByID);


module.exports = router;