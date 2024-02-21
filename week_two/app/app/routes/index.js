const express = require("express");
const router = express();
const contactsRoutes = require("./contactsRoutes");

router.use('/contacts', contactsRoutes)

module.exports = router;