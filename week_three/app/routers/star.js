// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`)
const { checkAcceptHeader, uploadImage } = require("../utils/middleware.js");

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, checkAcceptHeader, starCtlr.index)
router.get('/create', starCtlr.form);
router.post(`/`, checkAcceptHeader, uploadImage, starCtlr.create);
router.get(`/:id`, checkAcceptHeader, starCtlr.show);
router.get('/:id/edit', starCtlr.form);
router.put(`/:id`, checkAcceptHeader, uploadImage, starCtlr.update);
router.delete(`/:id`, checkAcceptHeader, starCtlr.remove);

// export "router"
module.exports = router

