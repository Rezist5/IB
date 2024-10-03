const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AdminCompany = require('./AdminCompany');
const Company = require('./Company');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    Fullname: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING, allowNull: true },
    roleId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles', 
            key: 'id'
        }
    }
});

User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
};

User.belongsToMany(Company, { through: AdminCompany, foreignKey: 'adminId', as: 'companies' });



module.exports = User;