const express = require("express");

const propertyControllers = require("../controllers/property-controllers");

const router = express.Router();

router.get("/:pid", propertyControllers.getPropertyById);
router.get("/user/:uid", propertyControllers.getPropertyByUserId);

module.exports = router;