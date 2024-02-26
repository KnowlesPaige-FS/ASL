const {Star, Galaxy, Planet} = require('../models/index')

const index = async (req, res) => {
  const stars = await Star.findAll({
    include: [Galaxy, Planet]
  })
  res.status(200).json(stars)
}

const show = async (req, res) => {
  const star = await Star.findByPk(req.params.id)
  res.status(200).json(star)
}

const create = async (req, res) => {
  console.log('star', req.body)
  const {name, size, description} = req.body
  const star = await Star.create({name, size, description})
  res.status(200).json(star)
}

const update = async (req, res) => {
  const {id} = req.params
  const {name, size, description, galaxyId, planetId} = req.body
  const star = await Star.update({name, size, description, galaxyId, planetId}, {
    where: {id}
  })
  res.status(200).json(star)
}

const remove = async (req, res) => {
  const {id} = req.params
  await Star.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  
  try {
    const remove = await Star.destroy({where: {id}});
    res.status(200).json({remove});
  } 
  catch(error) {
    res.status(500).json({error: 'Internal Server Error'});
  } 
  finally {
    await Galaxy.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
}
// Export all controller actions
module.exports = {index, show, create, update, remove }
