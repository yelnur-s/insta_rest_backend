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

module.exports = {follow, unFollow}