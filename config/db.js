// подключение sequelize к базе данных 

const { Sequelize } = require('sequelize');
const dbConf = require('./config');
const sequelize = new Sequelize(dbConf.development.database, dbConf.development.username, dbConf.development.password, {
  host: dbConf.development.host,
  dialect: dbConf.development.dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((error) => {
    console.error('Ошибка соединения с базой данных:', error);
  });

module.exports = sequelize;
