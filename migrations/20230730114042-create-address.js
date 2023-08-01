'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      houseNumber: {
        type: Sequelize.INTEGER
      },
      streetNumber: {
        type: Sequelize.INTEGER
      },
      area: {
        type: Sequelize.STRING
      },
      landmark: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      addressType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('address');
  }
};