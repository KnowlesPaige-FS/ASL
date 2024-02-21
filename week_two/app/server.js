const express = require("express");
const app = express();
const router = require("./app/routes/index")
const port = 8080;

app.use(express.json());

app.listen(port, () => {
    console.log("Listening on port " + port);
});

app.use("/v1", router);
