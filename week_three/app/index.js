
// Load in our Express framework
const express = require(`express`);
const Twig = require('twig');
// Create a new Express instance called "app"
const app = express();

Twig.extend((Twig) => {
  // Enable async extensions
  Twig.exports.extendAsync = true;
});
app.engine('twig', require('twig').renderFile);
// Configure twig template engine
app.set('view engine', 'twig');
app.set('views', `${__dirname}/templates`);

// enabling file uploads
const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use(express.static(`${__dirname}/public`));

const bodyParser = require('body-parser');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load in our RESTful routers
const routers = require('./routers/index.js');

// Home page welcome middleware
app.get('/', (req, res) => {
  res
    .status(200)
    .render('layouts/_main.twig');
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);
app.use(`/starsplanets`, routers.starsplanets);

// Set our app to listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
