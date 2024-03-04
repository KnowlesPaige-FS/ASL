const util = require("util");
const path = require("path");

// Load in models
const { Planet, Star, Galaxy } = require('../models')

function checkAcceptHeader(req, res, next) {
    const acceptHeader = req.get("Accept");
    if (acceptHeader?.indexOf("application/json") >= 0) {
        res.locals.asJson = true;
    }
    next(); 
}

function uploadImage(req, res, next) {
    // Define the absolute final file path for this image
    let uploadPath = `${__dirname}/../public/uploads/`;
    let id;
    let model;

    if (req.planetId) {
        id = req.planetId;
        uploadPath += `planets/images/%s%s`;
        model = Planet;
    } else if (req.starId) {
        id = req.starId;
        uploadPath += `stars/images/%s%s`;
        model = Star;
    } else if (req.galaxyId) {
        id = req.galaxyId;
        uploadPath += `galaxies/images/%s%s`;
        model = Galaxy;
    } else {
        return next();
    }

    const files = req.files || [];

    // Check to see if there are any files to upload
    if (Object.keys(files).length > 0) {
        const extension = path.extname(req.files.image.name);
        uploadPath = util.format(uploadPath, id, extension);
        
        req.files.image.mv(uploadPath, async (err) => {
            if (err) {
                console.error(err);
                // Handle error, if any
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // Update the model with the new file extension uploaded
            await model.update(
                { extension },
                { where: { id: Number(id) } }
            );
            next();
        });
    } else {
        next();
    }
}

module.exports = {
    checkAcceptHeader,
    uploadImage
};

