const {Galaxy, Star} = require('../models/index');
// Show all resources
const index = async (req, res) => {
  const galaxies = await Galaxy.findAll({
    include: [Star]
  })
  res.status(200).json(galaxies)
}

const show = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id)
  res.status(200).json(galaxy)
}

const create = async (req, res) => {
  console.log("galaxy", req.body)
  const {name, size, description} = req.body
  const galaxy = await Galaxy.create({name, size, description})

  res.status(200).json(galaxy)
}

const update = async (req, res) => {
  const { name, size, description, StarId } = req.body
  const {id} = req.params
  const galaxy = await Galaxy.update({name, size, description, starId}, {
    where: {id}
  })
  res.status(200).json(galaxy)
}

const remove = async (req, res) => {
  const { id } = req.params
  await Galaxy.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  
  try {
    const remove = await Galaxy.destroy({where: {id}});
    res.status(200).json({remove});
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  } finally {
    await Galaxy.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
}

// Export all controller actions
module.exports = {index, show, create, update, remove}
