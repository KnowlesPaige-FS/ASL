'use strict';
const [createdAt, updatedAt] = [new Date(), new Date()]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stars', [{
      name: 'Sun (Sol)',
      size: 864000,
      description: 'The star at the center of the solar system, around which the planets orbit. It is a yellow dwarf star of spectral type G2V.',
      createdAt, updatedAt
   },
   {
     name: 'Sirius (Alpha Canis Majoris)',
     size: 1470000,
     description: 'The brightest star in the night sky and part of the Canis Major constellation. It is a binary star system consisting of Sirius A, a main-sequence star, and Sirius B, a white dwarf.',
     createdAt, updatedAt
  },
  {
   name: 'Betelgeuse (Alpha Orionis)',
   size: 1000000000,
   description: 'A red supergiant star located in the constellation Orion. It is one of the largest known stars and is nearing the end of its life, expected to explode as a supernova in the future.',
   createdAt, updatedAt
 }
 ], {});
},


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stars', null, {});
  }
};

