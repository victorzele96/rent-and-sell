const express = require("express");

const propertyControllers = require("../controllers/property-controllers");

const router = express.Router();

router.get("/:pid", propertyControllers.getPropertyById);
router.get("/user/:uid", propertyControllers.getPropertiesByUserId);

router.post("/", propertyControllers.createProperty);

router.patch("/:pid", propertyControllers.updateProperty);

router.delete("/:pid", propertyControllers.deleteProperty);

module.exports = router;
