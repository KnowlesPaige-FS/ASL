const { Planet, Star } = require('../models/index');

const index = async (req, res) => {
  try {
    const planets = await Planet.findAll({
      include: [
        { model: Star },
      ]
    });
    res.status(200).json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await Planet.findByPk(id, {
      include: [
        { model: Star },
      ]
    });
    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }
    res.status(200).json(planet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const planet = await Planet.create({ name, size, description });
    res.status(200).json(planet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, size, description } = req.body;
    const updatedPlanet = await Planet.update({ name, size, description }, { where: { id } });
    res.status(200).json(updatedPlanet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const removedPlanetCount = await Planet.destroy({ where: { id } });
    if (removedPlanetCount === 0) {
      return res.status(404).json({ error: 'Planet not found' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { index, show, create, update, remove };

