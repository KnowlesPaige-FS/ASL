const { Star, Galaxy, Planet } = require('../models/index');

const index = async (req, res) => {
  try {
    const stars = await Star.findAll({
      include: [
        { model: Galaxy },
        { model: Planet }
      ]
    });
    res.status(200).render('star/index.html.twig', { stars });
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
    res.status(200).render('star/show.html.twig', { star });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const form = async (req, res) => {
  try {
    res.status(200).render('planet/form.html.twig');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const planet = await Planet.create({ name, size, description });
    res.status(200).render('planet/show.html.twig', { planet });
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
    res.status(200).render('planet/show.html.twig', { planet: updatedPlanet });
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

module.exports = { index, show, form, create, update, remove };
