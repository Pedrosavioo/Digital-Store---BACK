"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("product_images", {
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
         enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
         },
         path: {
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable('product_images')
   },
};