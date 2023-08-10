const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');
const Story = sequelize.define('Story', {
  video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valid_till: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
{
  timestamps: false, // Отключение автоматических полей createdAt и updatedAt
}
);
Story.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = Story;
