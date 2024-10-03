const roleFactory = require('../factories/roleFactory');
const userFactory = require('../factories/userFactory');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userRole = await roleFactory('USER');
    const adminRole = await roleFactory('ADMIN');
    const rootRole = await roleFactory('ROOT');

    await userFactory(
      'root@example.com',
      'Root User',
      'supersecretpassword',
      "ROOT"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'root@example.com' });
    await queryInterface.bulkDelete('Roles', null, {});
  }
};