"use strict";

const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      return queryInterface.bulkInsert("users", [
         {
            firstname: "pedro",
            surname: "savio",
            email: "psavio@gmail.com",
            password: await bcrypt.hash(
               "senha12345",
               Number(process.env.BCRYPT_SALTS) || 10
            ),
         },
         {
            firstname: "jose",
            surname: "carlos",
            email: "josecarlos@gmail.com",
            password: await bcrypt.hash(
               "senha12345",
               Number(process.env.BCRYPT_SALTS) || 10
            ),
         },
         {
            firstname: "luis",
            surname: "felipe",
            email: "luisfelipe@gmail.com",
            password: await bcrypt.hash(
               "senha12345",
               Number(process.env.BCRYPT_SALTS) || 10
            ),
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
