const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const propertiesControllers = require('../controllers/properties-controllers');

const { userAuth } = require('../middleware/check-auth');

router.get('/user/:uid', propertiesControllers.getPropertiesByUserId);

router.get('/:pid', propertiesControllers.getPropertyById);

router.get('/', propertiesControllers.getAllProperties);

router.use(userAuth);

router.post(
  '/',
  [
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
    check('images').isArray().isLength({ min: 1 }),
    check('details.listing_status').custom(value => (value === 'sale' || value === 'rent') ? true : Promise.reject('Listing Status must be Sale or Rent.')),
    check('details.price').isNumeric(),
    check('details.rooms_num').isNumeric(),
    check('details.room_size').isNumeric(),
    check('details.property_type').custom(value => value === 'house' || value === 'apartment' ? true : Promise.reject('house type must be house or apartment.')),
    check('details.renovated').isBoolean(),
    check('details.parking').isBoolean(),
    check('details.accessiblity').isBoolean(),
    check('details.park').isBoolean(),
    check('details.pets').isBoolean(),
    check('details.natural_illumination').isBoolean(),
    check('details.public_institutes').isBoolean(),
    check('details.public_transport').isBoolean(),
    check('details.contact').isMobilePhone()
  ],
  propertiesControllers.createProperty
);

router.patch(
  '/:pid',
  [
    check("description").isLength({ min: 5 }),
    check('details.listing_status').custom(value => (value === 'sale' || value === 'rent') ? true : Promise.reject('Listing Status must be Sale or Rent.')),
    check('details.price').isNumeric(),
    check('details.rooms_num').isNumeric(),
    check('details.room_size').isNumeric(),
    check('details.property_type').custom(value => value === 'house' || value === 'apartment' ? true : Promise.reject('house type must be house or apartment.')),
    check('details.renovated').isBoolean(),
    check('details.parking').isBoolean(),
    check('details.accessiblity').isBoolean(),
    check('details.park').isBoolean(),
    check('details.pets').isBoolean(),
    check('details.natural_illumination').isBoolean(),
    check('details.public_institutes').isBoolean(),
    check('details.public_transport').isBoolean(),
    check('details.contact').isMobilePhone()
  ],
  propertiesControllers.updateProperty
);

router.delete('/:pid', propertiesControllers.deleteProperty);

router.patch('/report/:pid/:uid', [
  check('userReport').isIn(['Spam', 'Wrong Information', 'Offensive']),
],
  propertiesControllers.reportProperty);

router.patch('/rate/:pid/:uid', [
  check('userRating').isInt({ min: 1, max: 5 }),
],
  propertiesControllers.rateProperty);

module.exports = router;