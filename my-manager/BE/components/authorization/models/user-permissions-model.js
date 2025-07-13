const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Adjust the path as needed

const UserPermissions = sequelize.define('UserPermissions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permission_id: {
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
        defaultValue: DataTypes.NOW,
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
    tableName: 'user_permissions',
    timestamps: false,
});

module.exports = UserPermissions;