'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('StarsPlanets', 'StarId');
    await queryInterface.removeColumn('StarsPlanets', 'PlanetId');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('StarsPlanets', 'StarId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Stars',
        key: 'id'
  }
});
await queryInterface.addColumn('StarsPlanets', 'PlanetId', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'Planets',
    key: 'id'
  }
});
}
};
