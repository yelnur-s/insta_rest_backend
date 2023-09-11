const fs = require('fs');
const path = require("path")

// конфигурация sequelize
module.exports = {
  development:{
    username: 'admin',
    password: 'root',
    database: 'admin',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: 'doadmin',
    password: 'AVNS_hIdPl7T6RjmT1D7PLhh',
    database: 'defaultdb',
    host: 'instadb-do-user-14638949-0.b.db.ondigitalocean.com',
    dialect: 'postgres',
    port: 25060,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt")),
      },
    }
  },
}

