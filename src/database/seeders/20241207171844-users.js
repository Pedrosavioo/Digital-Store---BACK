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
            email: "psavio@gmaail.com",
            password: await bcrypt.hash(
               "senha12345",
               Number(process.env.BCRYPT_SALTS) || 10
            ),
         },
         {
            firstname: "jose",
            surname: "carlos",
            email: "josecarlos@gmaail.com",
            password: await bcrypt.hash(
               "senha12345",
               Number(process.env.BCRYPT_SALTS) || 10
            ),
         },
         {
            firstname: "luis",
            surname: "felipe",
            email: "luisfelipe@gmaail.com",
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
