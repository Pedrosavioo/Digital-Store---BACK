"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("product", {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         slug: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         use_in_menu: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
         },
         stock: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
         },
         description: {
            type: Sequelize.STRING,
            allowNull: true,
         },
         price: {
            type: Sequelize.FLOAT,
            allowNull: false,
         },
         price_with_discount: {
            type: Sequelize.FLOAT,
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
      await queryInterface.dropTable("products");
   },
};