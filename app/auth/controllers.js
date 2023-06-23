const bcrypt = require('bcrypt');
const User = require('./User');
const signUp = async (req, res) => {
  if (
    req.body.email.length > 0 &&
    req.body.full_name.length > 0 &&
    req.body.username.length > 0 &&
    req.body.password.length > 0
  ) {
    const findUser = await User.findOne({where: { email: req.body.email }});
    if (findUser) {
      res.status(401).send({message: "такой пользователь уже существует"});
    }else{
      // хэширование пароля при помощи библиотеки bcrypt
      // gensalt генерации соли
      bcrypt.genSalt(10, (err, salt) => {
        // соединение соли и пароля
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          const user = User.create({
            email: req.body.email,
            full_name: req.body.full_name,
            username: req.body.username,
            password: hash,
          })
         
          res.status(200).send(user);
        });
      });
    }
   
  }else{
    res.status(401).send({message: "заполните все поля"});
  }
}

module.exports = {
  signUp,
}