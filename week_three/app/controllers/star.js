const { Star, Galaxy, Planet } = require('../models/index');

const index = async (req, res) => {
  try {
    const stars = await Star.findAll({
      include: [
        { model: Galaxy },
        { model: Planet }
      ]
    });
    if (res.locals.asJson) {
      res.status(200).json(stars);
      return;
    }
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
      if (res.locals.asJson) {
        return res.status(404).json({ error: 'Star not found' });
      }
      return res.status(404).render('error.html.twig', { error: 'Star not found' });
    }
    if (res.locals.asJson) {
      res.status(200).json(star);
      return;
    }
    res.status(200).render('star/show.html.twig', { star });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const form = async (req, res) => {
  const { id } = req.params || -1;
  let star;
  let galaxies;
  let planets;
  try {
    if (id >= 0) {
      star = await Star.findOne({ where: { id } });
    }
    galaxies = await Galaxy.findAll();
    planets = await Planet.findAll(); 
    res.render('star/form.html.twig', { star, galaxies, planets }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const { name, size, description, galaxyId } = req.body;
    const star = await Star.create({ name, size, description, galaxyId });
    res.redirect('/stars');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, size, description, galaxyId } = req.body;
    const updatedStar = await Star.update({ name, size, description, galaxyId }, { where: { id } });
    res.redirect('/stars');
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
      if (res.locals.asJson) {
        return res.status(404).json({ error: 'Star not found' });
      }
      return res.status(404).render('error.html.twig', { error: 'Star not found' });
    }
    if (res.locals.asJson) {
      res.status(200).json({ success: true });
      return;
    }
    res.redirect('/stars'); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { index, show, form, create, update, remove };
