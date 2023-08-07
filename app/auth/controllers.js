const bcrypt = require('bcrypt');
const User = require('./User');
const jwt = require('jsonwebtoken');
const {jwtOptions} = require('./passport');


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

const signIn = async (req, res) => {
  
    const user = await User.findOne({where: {email: req.body.email}})
    if(!user){
      return res.status(401).json({ message: 'Неправильный email или пароль' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неправильный email или пароль' });
    }
    // Проверка имени пользователя и пароля в базе данных
    // При успешной аутентификации, создайте JWT токен
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,

      }, jwtOptions.secretOrKey,
      {
        // продолжительность токена
        expiresIn: 24 * 60 * 60
      }
    );

    res.json({ message: 'Вход выполнен успешно', token });
}

const editUser = async (req, res) => {
  console.log(req.body)
  if (
    req.body.email.length > 0 &&
    req.body.full_name.length > 0 &&
    req.body.username.length > 0
  ){
    const user = await User.update({
      email: req.body.email,
      full_name: req.body.full_name,
      username: req.body.username,
      phone: req.body.phone || null
    },
    {
      where: {
        id: req.user.id
      }
    })
    res.status(200).end()
  }else{
    res.status(403).send({message: "Заполните все поля"})
  }
}

module.exports = {
  signUp,
  signIn,
  editUser
}