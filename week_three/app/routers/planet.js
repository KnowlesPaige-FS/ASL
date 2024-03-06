// Load in Express framework
const express = require(`express`);
const planetCtlr = require(`../controllers/planet.js`);
const { checkAcceptHeader, uploadImage } = require("../utils/middleware.js");

const router = new express.Router();

router.get(`/`, checkAcceptHeader, planetCtlr.index);
router.get('/create', planetCtlr.form);
router.post(`/`, checkAcceptHeader, uploadImage, planetCtlr.create);
router.get(`/:id`, checkAcceptHeader, planetCtlr.show);
router.get('/:id/edit', planetCtlr.form);
router.put(`/:id`, checkAcceptHeader, planetCtlr.update);
router.post(`/:id`, checkAcceptHeader, uploadImage, planetCtlr.update);
router.get(`/:id/delete`, planetCtlr.remove);
router.delete(`/:id`, checkAcceptHeader, planetCtlr.remove);

module.exports = router;
