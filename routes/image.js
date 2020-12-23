let express = require("express");
let routeController = require("../controllers/imageController");
let router = express.Router();

router.get("/", routeController.getImages);

router.get("/:name", routeController.getImageDataByName);

module.exports = router;
