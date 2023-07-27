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

module.exports = {createPost}

