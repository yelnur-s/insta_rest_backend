const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');
const Post = sequelize.define('Post', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },

},
{
  timestamps: false, // Отключение автоматических полей createdAt и updatedAt
}
);
Post.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = Post;
