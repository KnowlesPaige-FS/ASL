'use strict';
const [createdAt, updatedAt] = [new Date(), new Date()]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Galaxies', [{
      name: 'Milky Way',
      size: 150000,
      description: 'The galaxy to which the Earth and our solar system belong. It contains billions of stars, including our sun, and various stellar and planetary systems.',
      createdAt, updatedAt
   },
   {
     name: 'Andromeda Galaxy (M31)',
     size: 220000,
     description: 'The closest spiral galaxy to the Milky Way and the largest member of the Local Group of galaxies, which also includes the Milky Way, the Triangulum Galaxy, and about 54 other smaller galaxies.',
     createdAt, updatedAt
  },
  {
   name: 'Triangulum Galaxy (M33)',
   size: 70000,
   description: 'Another member of the Local Group, situated close to the Andromeda and Milky Way galaxies. It is a spiral galaxy similar in structure to the Milky Way and Andromeda.',
   createdAt, updatedAt
 }
 ], {});
},

async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Galaxies', null, {});
}
};

