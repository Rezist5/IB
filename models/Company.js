const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Company = sequelize.define('Company', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    images: { 
        type: DataTypes.JSON, 
        allowNull: true 
    }
}, {
    tableName: 'Companies', 
    timestamps: true 
});

Company.associate = (models) => {
    Company.belongsToMany(models.User, { 
        through: models.AdminCompany,
        foreignKey: 'companyId', 
        as: 'admins' 
    });
};

module.exports = Company;
