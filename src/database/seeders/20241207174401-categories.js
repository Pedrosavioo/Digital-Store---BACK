"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      return queryInterface.bulkInsert("category", [
         {
            name: "Shoes",
            slug: "shoes",
            use_in_menu: true,
         },
         {
            name: "Clothing",
            slug: "clothing",
            use_in_menu: true,
         },
         {
            name: "Accessories",
            slug: "accessories",
            use_in_menu: true,
         },
         {
            name: "Electronics",
            slug: "electronics",
            use_in_menu: true,
         },
         {
            name: "Books",
            slug: "books",
            use_in_menu: false,
         },
         {
            name: "Home & Kitchen",
            slug: "home-kitchen",
            use_in_menu: true,
         },
         {
            name: "Beauty & Personal Care",
            slug: "beauty-personal-care",
            use_in_menu: false,
         },
         {
            name: "Sports",
            slug: "sports",
            use_in_menu: true,
         },
         {
            name: "Toys",
            slug: "toys",
            use_in_menu: false,
         },
         {
            name: "Health",
            slug: "health",
            use_in_menu: false,
         },
         {
            name: "Automotive",
            slug: "automotive",
            use_in_menu: true,
         },
         {
            name: "Music Instruments",
            slug: "music-instruments",
            use_in_menu: true,
         },
         {
            name: "Garden & Outdoors",
            slug: "garden-outdoors",
            use_in_menu: false,
         },
         {
            name: "Pet Supplies",
            slug: "pet-supplies",
            use_in_menu: true,
         },
         {
            name: "Travel",
            slug: "travel",
            use_in_menu: false,
         },
      ]);
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
