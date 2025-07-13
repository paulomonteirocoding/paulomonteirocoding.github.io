// config/database.js
const { Sequelize } = require('sequelize');
const process = require('process');
const { logger } = require('../library/logger')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: (msg) => {
      // Filtrar manualmente se for necessário
      if (msg.toLowerCase().includes('warning') || msg.toLowerCase().includes('error')) {
        logger.warn(msg); // envia apenas avisos/erros
      }
    }
  }
);

module.exports = sequelize;