let express = require("express");
let routeController = require("../controllers/itemController");
let router = express.Router();

router.get("/", routeController.getItemSummary);

module.exports = router;
