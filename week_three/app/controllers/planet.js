const { Planet, Star } = require('../models/index');

const index = async (req, res) => {
  try {
    const planets = await Planet.findAll({
      include: [{ model: Star }]
    });
    if (res.locals.asJson) {
      res.status(200).json(planets);
      return;
    }
    res.status(200).render('planet/index.html.twig', { planets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await Planet.findByPk(id, {
      include: [{ model: Star }]
    });
    if (!planet) {
      if (res.locals.asJson) {
        return res.status(404).json({ error: 'Planet not found' });
      }
      return res.status(404).render('error.html.twig', { error: 'Planet not found' });
    }
    if (res.locals.asJson) {
      res.status(200).json(planet);
      return;
    }
    res.status(200).render('planet/show.html.twig', { planet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const form = async (req, res) => {
  const { id } = req.params || -1;
  let planet;
  let selectedStarIds = [];
  if (id >= 0) {
    planet = await Planet.findOne({ where: { id }, include: [{ model: Star }] });
    selectedStarIds = planet.Stars.map(star => star.id);
  }
  const stars = await Star.findAll();
  res.render('planet/form.html.twig', { planet, stars, selectedStarIds });
};

const create = async (req, res) => {
  try {
    const { name, size, description, StarId } = req.body;
    const planet = await Planet.create({ name, size, description });

    // Associate the planet with a star
    await planet.setStars(StarId);

    // Redirect to the index page
    res.redirect('/planets');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, size, description, StarId } = req.body;
    await Planet.update({ name, size, description }, { where: { id } });
    
    // Associate the planet with a star
    const planet = await Planet.findByPk(id);
    await planet.setStars(StarId);

    // Redirect to the index page
    res.redirect('/planets');
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
      if (res.locals.asJson) {
        return res.status(404).json({ error: 'Planet not found' });
      }
      return res.status(404).render('error.html.twig', { error: 'Planet not found' });
    }
    if (res.locals.asJson) {
      res.status(200).json({ success: true });
      return;
    }
    res.redirect('/planets'); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { index, show, form, create, update, remove };

