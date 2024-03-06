// Load in Express framework
const express = require(`express`);
const galaxyCtlr = require(`../controllers/galaxy.js`);
const { checkAcceptHeader, uploadImage } = require("../utils/middleware.js");

const router = new express.Router();

router.get(`/`, checkAcceptHeader, galaxyCtlr.index);
router.get('/create', galaxyCtlr.form);
router.post(`/`, checkAcceptHeader, uploadImage, galaxyCtlr.create);
router.get(`/:id`, checkAcceptHeader, galaxyCtlr.show);
router.get('/:id/edit', galaxyCtlr.form);
router.put(`/:id`, checkAcceptHeader, galaxyCtlr.update);
router.post(`/:id`, checkAcceptHeader, uploadImage, galaxyCtlr.update);
router.get(`/:id/delete`, galaxyCtlr.remove);
router.delete(`/:id`, checkAcceptHeader, galaxyCtlr.remove);

module.exports = router;


