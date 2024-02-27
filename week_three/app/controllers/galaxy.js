const { Galaxy, Star } = require('../models/index');

const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll({
      include: [
        { model: Star }
      ]
    });
    res.status(200).json(galaxies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const galaxy = await Galaxy.findByPk(id, {
      include: [
        { model: Star }
      ]
    });
    if (!galaxy) {
      return res.status(404).json({ error: 'Galaxy not found' });
    }
    res.status(200).json(galaxy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const { name, size, description} = req.body;
    const galaxy = await Galaxy.create({ name, size, description});
    res.status(200).json(galaxy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, size, description, StarId} = req.body;
    const updatedGalaxy = await Galaxy.update({ name, size, description, StarId }, { where: { id } });
    res.status(200).json(updatedGalaxy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const removedGalaxyCount = await Galaxy.destroy({ where: { id } });
    if (removedGalaxyCount === 0) {
      return res.status(404).json({ error: 'Galaxy not found' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { index, show, create, update, remove };
