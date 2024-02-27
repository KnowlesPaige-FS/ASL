const { Star, Galaxy, Planet } = require('../models/index');

const index = async (req, res) => {
  try {
    const stars = await Star.findAll({
      include: [
        { model: Galaxy },
        { model: Planet }
      ]
    });
    res.status(200).json(stars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const star = await Star.findByPk(id, {
      include: [
        { model: Galaxy }
      ]
    });
    if (!star) {
      return res.status(404).json({ error: 'Star not found' });
    }
    res.status(200).json(star);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const star = await Star.create({ name, size, description });
    res.status(200).json(star);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, size, description, galaxyId, PlanetId } = req.body;
    const updatedStar = await Star.update({ name, size, description, galaxyId, PlanetId }, { where: { id } });
    res.status(200).json(updatedStar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const removedStarCount = await Star.destroy({ where: { id } });
    if (removedStarCount === 0) {
      return res.status(404).json({ error: 'Star not found' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { index, show, create, update, remove };
