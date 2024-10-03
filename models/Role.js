const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Role = sequelize.define('Role', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false 
    }
}, {
    tableName: 'Roles', 
    timestamps: true 
});

Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
};

module.exports = Role;
