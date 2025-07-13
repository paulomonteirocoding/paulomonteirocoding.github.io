// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // ajuste o caminho para sua instância do Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true
  },
  fname: {
    type: DataTypes.STRING(255)
  },
  lname: {
    type: DataTypes.STRING(255)
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true
  },
  pw: {
    type: DataTypes.STRING(255)
  },
  salt: {
    type: DataTypes.STRING(255)
  },
  created_by: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  creation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deleted_by: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  deleted_date: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  last_modified_by: {
    type: DataTypes.INTEGER
  },
  last_modification_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',   // Garante que o nome da tabela seja 'users'
  timestamps: false     // Desativa os timestamps automáticos (createdAt e updatedAt)
});

module.exports = User;
