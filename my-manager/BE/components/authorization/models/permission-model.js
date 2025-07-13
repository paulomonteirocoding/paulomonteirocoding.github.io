const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Adjust the path as needed

const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permissionName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    parentPermissionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    tableName: 'permissions',
    timestamps: false,
});

module.exports = Permission;