const {Planet} = require('../models/index');

const index = async (req, res) => {
  const planets = await Planet.findAll()
  res.status(200).json(planets)
}

const show = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id)
  res.status(200).json(planet)
}

const create = async (req, res) => {
  console.log('planet', req.body)
  const {name, size, description} = req.body
  const planet = await Planet.create({name, size, description})
  res.status(200).json(planet)
}

const update = async (req, res) => {
  const {id} = req.params
  const {name, size, description} = req.body
  const planet = await Planet.update({name, size, description}, {
    where: {id}
  })
  res.status(200).json(planet)
}

const remove = async (req, res) => {
  const {id} = req.params
  try {
    const remove = await Planet.destroy({where: {id}});
    res.status(200).json({remove});
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
}

// Export all controller actions
module.exports = {index, show, create, update, remove}
