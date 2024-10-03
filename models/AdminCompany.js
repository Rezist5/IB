const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AdminCompany = sequelize.define('AdminCompany', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = AdminCompany;
