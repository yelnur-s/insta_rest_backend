const Comment = require('./Comment')
const newComment = (req, res) => {
  if(
    req.body.description > 0
  ){
    const comment = Comment.create({
      description: req.body.description,
      userId: req.user.id,
      postId: req.body.postId
    })
    res.status(200).end();
  }else{
    res.status(401).send({message: "заполните все поля"});
  }
}

const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({
      where: { id: req.params.id }
    })
    res.status(200).send();
  } catch (error) {
      console.error('Error deleting item by ID:', error);
    throw error;
  }
}
const getCommentsByPostId = async (req, res) => {
  try{
    const comments = await Comment.findAll({
      where: {
        postId: req.body.postId
      }
    })
    res.status(200).send(comments);
  }
  catch(error) {
    console.error('Error while fetching items:', error);
    throw error;
  }
}
module.exports = { newComment, deleteComment, getCommentsByPostId }