const express = require("express");
const router = express();
const contactsRoutes = require("./contactsRoutes");

router.get("/v1", (req, res) => {

    res.status(200).json({
        method: req.method,
        message: "Received request"
    });
});

router.use("/v1", contactsRoutes);

module.exports = router;