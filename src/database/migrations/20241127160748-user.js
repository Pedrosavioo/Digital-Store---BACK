'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.createTable("users", {
        id: {
           type: Sequelize.INTEGER,
           allowNull: false,
           autoIncrement: true,
           primaryKey: true,
        },
        firstname: {
           type: Sequelize.STRING,
           allowNull: false,
        },
        surname: {
           type: Sequelize.STRING,
           allowNull: false,
        },
        email: {
           type: Sequelize.STRING,
           allowNull: false,
           unique: true,
        },
        password: {
           type: Sequelize.STRING,
           allowNull: false,
        },
        created_at: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.fn("NOW"),
        },
        updated_at: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.fn("NOW"),
        },
     });
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.dropTable("users");
  },
};