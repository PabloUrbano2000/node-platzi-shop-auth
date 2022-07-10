const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.engineDB}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: config.engineDB,
  },
  production: {
    url: config.dbUrl,
    dialect: config.engineDB,
    dialectOptions: {
      rejectUnauthorized: false,
    },
  },
};
