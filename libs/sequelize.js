const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.engineDB}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  // para cambiar de motor de bd
  dialect: config.engineDB,
  logging: true,
});

setupModels(sequelize);

// gracias al squema el va a crear la tabla con la
// la estructura en la db
// sequelize.sync();

module.exports = sequelize;
