"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", {
      username: "shardul01",
      firstName: 'Shardul',
      lastName: 'Singh',
      email: 'shardul.singh@yopmail.com',
      password: 'Shardul@123',
      dob: new Date().toISOString(),
      phone: '8778233280',
      gender: 'MALE',
      status: 'ACTIVE'
    },
    {
      username: "harsh.ak",
      firstName: 'Harsh',
      lastName: 'Singh',
      email: 'harsh.singh@yopmail.com',
      password: 'Harsh@123',
      dob: new Date().toISOString(),
      phone: '87782339090',
      gender: 'MALE',
      status: 'ACTIVE'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
