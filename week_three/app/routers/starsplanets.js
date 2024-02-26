// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const starsplanetsCtlr = require(`../controllers/starsplanets.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, starsplanetsCtlr.index)
router.post(`/`, starsplanetsCtlr.create)
router.get(`/:id`, starsplanetsCtlr.show) 
router.put(`/:id`, starsplanetsCtlr.update) 
router.delete(`/:id`, starsplanetsCtlr.remove) 

// export "router"
module.exports = router