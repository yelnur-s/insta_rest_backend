const Comment = require('./Comment');
const Like = require('../like/Like');

const newComment = (req, res) => {
  try {
    if(
      req.body.description > 0
    ){
      const comment = Comment.create({
        description: req.body.description,
        userId: req.user.id,
        postId: req.body.postId
      })
      res.status(200).send(comment);
    }else{
      res.status(401).send({message: "заполните все поля"});
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({
      where: { id: req.params.id }
    })
    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
}
const getCommentsByPostId = async (req, res) => {
  try{
    const comments = await Comment.findAll({
      where: {
        postId: req.body.postId
      },
      include: [{ model: Like }], 
    })

    if (!comments) {
      return res.status(404).send({ message: 'Комментарий не найден' });
    }

    res.status(200).send(comments);
  }
  catch(error) {
    res.status(500).send(error);
  }
}
module.exports = { newComment, deleteComment, getCommentsByPostId }