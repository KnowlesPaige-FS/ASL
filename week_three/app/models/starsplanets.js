'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    static associate(models) {
      StarsPlanets.belongsTo(models.Star);
      StarsPlanets.belongsTo(models.Planet);
    }
  }
  StarsPlanets.init({
    StarId: DataTypes.INTEGER,
    PlanetId: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'StarsPlanets',
  });
  return StarsPlanets;
};