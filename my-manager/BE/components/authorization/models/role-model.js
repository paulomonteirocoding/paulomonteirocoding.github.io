const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Adjust the path to your database configuration

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    roleName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'roles',
    timestamps: false, // Disable createdAt and updatedAt fields
});

module.exports = Role;