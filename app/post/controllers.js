const Post = require('./Post');

const createPost = (req, res) => {
  console.log(req.body)
  console.log(req.user)

  // res.status(200).end();
  if(
    req.body.description.length >= 0 &&
    req.user.id > 0
  ){
    const post = Post.create({
      image: 'test',
      description: req.body.description,
      userId: req.user.id
    })
   
    res.status(200).send(post);
  }else{
    res.status(401).send({message: "заполните все поля"});
  }
  // c картинкой
  // if(
  //   req.file && 
  //   req.body.description >= 0 &&
  //   req.body.userId
  // ){
  //   const post = Post.create({
  //     image: req.file.path,
  //     description: req.body.description
  //   })
   
  //   res.status(200).send(user);
  // }else{
  //   res.status(401).send({message: "заполните все поля"});
  // }
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
const deletePostByID = async (req, res) => {
  try {
    const post = await Post.destroy({
      where: { id: req.params.id }
    })
    res.status(200).send();
  } catch (error) {
      console.error('Error deleting item by ID:', error);
    throw error;
  }
}


module.exports = {createPost, getAllUserPosts, getAllUsersPosts, getPostByID, deletePostByID}

