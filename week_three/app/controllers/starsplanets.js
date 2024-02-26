// starsPlanetsController.js

const { StarsPlanets } = require('../models');

const index = async (req, res) => {
  try {
    const associations = await StarsPlanets.findAll();
    res.status(200).json(associations);
  } catch (error) {
    console.error('Error fetching associations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const association = await StarsPlanets.findByPk(id);
    if (!association) {
      return res.status(404).json({ error: 'Association not found' });
    }
    res.status(200).json(association);
  } catch (error) {
    console.error('Error fetching association:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const { StarId, PlanetId } = req.body;
    const association = await StarsPlanets.create({ StarId, PlanetId });
    res.status(201).json(association);
  } catch (error) {
    console.error('Error creating association:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { StarId, PlanetId } = req.body;
    const association = await StarsPlanets.update({ StarId, PlanetId }, { where: { id } });
    res.status(200).json(association);
  } catch (error) {
    console.error('Error updating association:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await StarsPlanets.destroy({ where: { id } });
    if (!result) {
      return res.status(404).json({ error: 'Association not found' });
    }
    res.status(200).json({ message: 'Association deleted successfully' });
  } catch (error) {
    console.error('Error deleting association:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { index, show, create, update, remove };
