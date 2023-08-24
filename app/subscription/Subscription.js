const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Subscription = sequelize.define('Subscription', {
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  timestamps: false, // Отключение автоматических полей createdAt и updatedAt
}
);

module.exports = Subscription;
