'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StarsPlanets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StarId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Stars', 
          key: 'id'
        }
      },
      PlanetId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Planets', 
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StarsPlanets');
  }
};