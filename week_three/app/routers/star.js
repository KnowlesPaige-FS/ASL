// Load in Express framework
const express = require(`express`);
const starCtlr = require(`../controllers/star.js`);
const { checkAcceptHeader, uploadImage } = require("../utils/middleware.js");

const router = new express.Router();

router.get(`/`, checkAcceptHeader, starCtlr.index);
router.get('/create', starCtlr.form);
router.post(`/`, checkAcceptHeader, uploadImage, starCtlr.create);
router.get(`/:id`, checkAcceptHeader, starCtlr.show);
router.get('/:id/edit', starCtlr.form);
router.put(`/:id`, checkAcceptHeader, starCtlr.update);
router.post(`/:id`, checkAcceptHeader, uploadImage, starCtlr.update);
router.get(`/:id/delete`, starCtlr.remove);
router.delete(`/:id`, checkAcceptHeader, starCtlr.remove);

module.exports = router;
