const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const User = require('../auth/User');
const Post = require('./Post');

const createPost = (req, res) => {
  if(
    req.file && 
    req.body.description >= 0
  ){
    const post = Post.create({
      image: '/images/postsImages/' + req.file.filename,
      description: req.body.description,
      userId: req.user.id
    })
   
    res.status(200).end();
  }else{
    res.status(401).send({message: "заполните все поля"});
  }
}

const editPost = async (req, res) => {
  if(
    req.body.description.length >= 0 &&
    req.file
  ){
    const post = await Post.findByPk(req.body.id);

    fs.unlinkSync(path.join(__dirname + '../../../public' + post.image));

    Post.update({
      image: '/images/postsImages/' + req.file.filename,
      description: req.body.description,
      userId: req.user.id
    },
    {
      where: {
        id: req.body.id
      }
    })
   
    res.status(200).end();
  }else{
    res.status(401).send({message: "заполните все поля"});
  }
}

const deletePostByID = async (req, res) => {
  const post = await Post.findByPk(req.params.id)
  fs.unlinkSync(path.join(__dirname + '../../../public' + post.image));
  try {
    await Post.destroy({
      where: { id: req.params.id }
    })
    res.status(200).send();
  } catch (error) {
      console.error('Error deleting item by ID:', error);
    throw error;
  }
}





// -------------------------

const getAllUserPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userId: req.user.id,
      },
    });

     res.status(200).send(posts);
  } catch (error) {
      console.error('Error while fetching items:', error);
    throw error;
  }
}

const getAllUsersPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).send(posts);
  } catch (error) {
      console.error('Error while fetching items:', error);
    throw error;
  }
}
const getPostByID = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    res.status(200).send(post);
  } catch (error) {
      console.error('Item not found', error);
    throw error;
  }
}
const getByUsername = async (req, res) => {
  const username = req.params.username.toLowerCase();
  const user = await User.findOne({
    where: {
      username: { [Op.iLike]: `%${username}%` }
    }
  })
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }else{
    const posts = await Post.findAll({
      where: {
        userId: user.id
      }
    })
    res.status(200).send(posts)
  }

}


module.exports = {createPost, getAllUserPosts, getAllUsersPosts, getPostByID, deletePostByID, editPost, getByUsername}

