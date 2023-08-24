const User = require('../auth/User');
const Subscription = require('./Subscription');

const follow = async (req, res) => {
  const followerId = req.user.id; // Идентификатор текущего пользователя
  const followingId = req.params.userId;

  try {
    await Subscription.create({ followerId, followingId });
    res.status(201).json({ message: 'Successfully subscribed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const unFollow = async (req, res) => {
  const followerId = req.user.id; // Идентификатор текущего пользователя
  const followingId = req.params.userId;

  try {
    await Subscription.destroy({
      where: { followerId, followingId },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getFollowers = async (req, res) => {
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
}
const getFollowings = async (req, res) => {
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
}

module.exports = {follow, unFollow, getFollowers, getFollowings}