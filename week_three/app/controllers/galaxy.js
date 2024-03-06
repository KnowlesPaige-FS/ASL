const { Galaxy, Star } = require('../models/index');

const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll({
      include: [{ model: Star }]
    });
    if (res.locals.asJson) {
      res.status(200).json(galaxies);
      return;
    }
    res.status(200).render('galaxy/index.html.twig', { galaxies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const galaxy = await Galaxy.findByPk(id, {
      include: [{ model: Star }]
    });
    if (!galaxy) {
      if (res.locals.asJson) {
        return res.status(404).json({ error: 'Galaxy not found' });
      }
      return res.status(404).render('error.html.twig', { error: 'Galaxy not found' });
    }
    if (res.locals.asJson) {
      res.status(200).json(galaxy);
      return;
    }
    res.status(200).render('galaxy/show.html.twig', { galaxy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const form = async (req, res) => {
  const { id } = req.params || -1;
  let galaxy;
  if (id >= 0) {
    galaxy = await Galaxy.findOne({ where: { id } });
  }
  res.render('galaxy/form.html.twig', { galaxy });
};

const create = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const galaxy = await Galaxy.create({ name, size, description });
    res.redirect('/galaxies');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, size, description } = req.body;
    await Galaxy.update({ name, size, description }, { where: { id } });
    res.redirect('/galaxies');
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
      if (res.locals.asJson) {
        return res.status(404).json({ error: 'Galaxy not found' });
      }
      return res.status(404).render('error.html.twig', { error: 'Galaxy not found' });
    }
    res
    .redirect('/galaxies')
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { index, show, form, create, update, remove };

