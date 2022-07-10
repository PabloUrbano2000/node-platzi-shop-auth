const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.engineDB}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: config.engineDB,
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// gracias al squema el va a crear la tabla con la
// la estructura en la db
// sequelize.sync();

module.exports = sequelize;
