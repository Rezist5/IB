const Role = require('../models/Role'); 

const roleFactory = async (roleName) => {
  try {
    const role = await Role.create({ name: roleName });
    return role;
  } catch (error) {
    console.error(`Ошибка создания роли: ${error.message}`);
    throw error;
  }
};

module.exports = roleFactory;
