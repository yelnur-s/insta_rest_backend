const User = require('../auth/User');
const Subscription = require('./Subscription');

const follow = async (req, res) => {
  try {
    const followerId = req.user.id; // Идентификатор текущего пользователя
    const followingId = req.params.userId;  
    await Subscription.create({ followerId, followingId });
    res.status(201).json({ message: 'Successfully subscribed' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

const unFollow = async (req, res) => {
  try {
    const followerId = req.user.id; // Идентификатор текущего пользователя
    const followingId = req.params.userId;
    await Subscription.destroy({
      where: { followerId, followingId },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
const getFollowers = async (req, res) => {

  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      },
      attributes: { exclude: ['password'] }, // Исключаем поле password из выборки
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }else{

      const followers = await Subscription.findAll({
        where: { followingId: user.id },
        include: [{ model: User, as: 'Follower' }], // Включаем данные о подписчиках
      });

      res.status(200).send(followers.map(subscription => subscription.Follower))
    }
  } catch (error) {
    res.status(200).send(error)
  }
}
const getFollowings = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      },
      attributes: { exclude: ['password'] }, // Исключаем поле password из выборки
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }else{

      const following = await Subscription.findAll({
        where: { followerId: user.id },
        include: [{ model: User, as: 'Following' }], // Включаем данные о подписчиках
      });

      res.status(200).send(following.map(subscription => subscription.Following))
    }
  } catch (error) {
    res.status(200).send(error)
  }
}

module.exports = {follow, unFollow, getFollowers, getFollowings}