const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Adjust the path as needed

const UserRoles = sequelize.define('UserRoles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deleted_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    last_modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    last_modification_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'user_roles',
    timestamps: false,
});

module.exports = UserRoles;