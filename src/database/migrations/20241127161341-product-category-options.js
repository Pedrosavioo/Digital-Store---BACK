"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("product_category_options", {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "product",
               key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
         },
         category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "category",
               key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
         },
         createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn("NOW"),
         },
         updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn("NOW"),
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("product_category_options");
   },
};