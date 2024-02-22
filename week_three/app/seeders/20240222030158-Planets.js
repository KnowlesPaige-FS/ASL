'use strict';
const [createdAt, updatedAt] = [new Date(), new Date()]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Planets', [{
         name: 'Mars',
         size: 6779,
         description: 'The fourth planet from the sun, often called the "Red Planet" due to its reddish appearance caused by iron oxide prevalent on its surface. It has been a target for exploration due to the possibility of past or present life.',
         createdAt, updatedAt
      },
      {
        name: 'Mercury',
        size: 4880,
        description: 'The innermost planet of the solar system, known for its extreme temperature variations due to its proximity to the sun.',
        createdAt, updatedAt
     },
     {
      name: 'Venus',
      size: 12104,
      description: 'The second planet from the sun, often referred to as the "sister planet" of Earth, due to its similar size and composition, though it has a thick atmosphere that traps heat, making it the hottest planet in the solar system.',
      createdAt, updatedAt
    },
    {
      name: 'Earth',
      size: 12742,
      description: 'The third planet from the sun and the only known planet to support life. It has a diverse range of ecosystems, abundant water, and a protective atmosphere.',
      createdAt, updatedAt
    },
    {
      name: 'Jupiter',
      size: 139820,
      description: 'The largest planet in the solar system, known for its distinctive banded appearance and Great Red Spot. It has a strong magnetic field and at least 79 known moons.',
      createdAt, updatedAt
    },
    {
      name: 'Saturn',
      size: 116460,
      description: 'The second-largest planet in the solar system, famous for its spectacular ring system composed mainly of ice particles. It has at least 82 known moons.',
      createdAt, updatedAt
    },
    {
      name: 'Uranus',
      size: 50724,
      description: 'The seventh planet from the sun, an ice giant with a pale blue-green color due to methane in its atmosphere. It has a unique axial tilt, causing extreme seasons.',
      createdAt, updatedAt
    },
    {
      name: 'Neptune',
      size: 49244,
      description: 'The eighth and farthest planet from the sun, also an ice giant with a deep blue coloration due to methane. It has the strongest winds in the solar system and a system of faint rings.',
      createdAt, updatedAt
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Planets', null, {});
  }
};
