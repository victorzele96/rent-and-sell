const express = require("express");
const { check } = require("express-validator");

const propertyControllers = require("../controllers/property-controllers");

const router = express.Router();

router.get("/:pid", propertyControllers.getPropertyById);
router.get("/user/:uid", propertyControllers.getPropertiesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  propertyControllers.createProperty
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  propertyControllers.updateProperty
);

router.delete("/:pid", propertyControllers.deleteProperty);

module.exports = router;
