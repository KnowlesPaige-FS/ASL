// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`)
const { checkAcceptHeader } = require("../utils/middleware.js");

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, checkAcceptHeader, galaxyCtlr.index)
router.get('/create', galaxyCtlr.form);
router.post(`/`, checkAcceptHeader, galaxyCtlr.create);
router.get(`/:id`, checkAcceptHeader, galaxyCtlr.show);
router.get('/:id/edit', galaxyCtlr.form);
router.put(`/:id`, checkAcceptHeader, galaxyCtlr.update);
router.delete(`/:id`, checkAcceptHeader, galaxyCtlr.remove);

// export "router"
module.exports = router
