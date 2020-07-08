'use strict';
const cryptService = require('../../services/crypt-service')();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        allowNull: false,
        field: 'full_name',
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        field: 'email',
        type: Sequelize.STRING
      },
      passwordHash: {
        allowNull: false,
        field: 'password_hash',
        type: Sequelize.STRING
      },
    });
    const admin = {
      fullName: 'admin',
      email: 'admin@admin.com',
      passwordHash: await cryptService.crypt('admin'),
    };
    await queryInterface.sequelize.query(`INSERT INTO users (full_name, email, password_hash)
     VALUES ('${admin.fullName}', '${admin.email}', '${admin.passwordHash}')`);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
