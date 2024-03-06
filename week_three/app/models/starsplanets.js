'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    static associate(models) {
      StarsPlanets.belongsTo(models.Star,  { foreignKey: 'starId' });
      StarsPlanets.belongsTo(models.Planet,  { foreignKey: 'planetId' });
    }
  }
  StarsPlanets.init({
    StarId: DataTypes.INTEGER,
    PlanetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StarsPlanets',
  });
  return StarsPlanets;
};