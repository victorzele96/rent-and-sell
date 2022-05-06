const mongoose = require('mongoose');
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require('../util/location');
const Property = require('../models/property');
const User = require('../models/user');

const getPropertiesByUserId = async (req, res, next) => {
  const userId = req.params.uid // params = { uid: 'u1' }

  try {
    await Property.find({}, (err, properties) => {
      let userProperties = properties.filter((property) => property.creator.toString() === userId);

      if (!userProperties || userProperties.length === 0) {
        return next(
          new HttpError("Could not find a property for the provided user id.", 404)
        );
      }

      res.json({ properties: userProperties });
    }).clone();
  } catch (err) {
    return next(
      new HttpError('Fetching properties failed, please try again later.', 500)
    );
  }

  // res.json({ properties });
};

const getPropertyById = async (req, res, next) => {
  const propertyId = req.params.pid // params = { pid: 'h1' }

  let property;
  try {
    property = await Property.findById(propertyId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find a property.', 500)
    );
  }

  if (!property) {
    return next(
      new HttpError("Could not find a property for the provided id.", 404)
    );
  }

  res.json({ property });
};

const getAllProperties = async (req, res, next) => {
  try {
    await Property.find({}, (err, properties) => {
      res.json({ properties: properties });
    }).clone();
  } catch (err) {
    return next(
      new HttpError('Fetching properties failed, please try again later.', 500)
    );
  }
};

const createProperty = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { description, address, images, details } = req.body;
  // let coordinates;
  // try {
  // coordinates = await getCoordsForAddress(address);
  // TODO: adjust the getCoordsForAddress function to node geocoder
  // } catch (err) {
  //   return next(err);
  // }

  const createdProperty = new Property({
    description,
    address,
    images,
    creator: req.userData.userId,
    details
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError('Creating property failed, please try again.', 500)
    );
  }

  if (!user) {
    return next(
      new HttpError('Could not find user for provided id', 404)
    );
  }

  console.log(createdProperty);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProperty.save({ session: sess });
    user.properties.push(createdProperty);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Creating property failed, please try again.', 500)
    );
  }

  res.status(201).json({ property: createdProperty });
};

const updateProperty = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { description, images, details } = req.body;
  const {
    listing_status, price, rooms_num, room_size,
    floor, stories, renovated, parking, accessiblity,
    park, pets, natural_illumination, public_institutes,
    public_transport, contact
  } = details;
  const propertyId = req.params.pid;

  let property;
  try {
    property = await Property.findById(propertyId)
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update property.', 500)
    );
  }

  if (property.creator.id.toString() !== req.userData.userId) {
    return next(
      new HttpError('You are not allowed to edit this property.', 401)
    );
  }

  property.description = description;
  property.images = images.map(image => image);
  property.details.listing_status = listing_status;
  property.details.price = price;
  property.details.rooms_num = rooms_num;
  property.details.room_size = room_size;
  property.details.floor = floor;
  property.details.stories = stories;
  property.details.renovated = renovated;
  property.details.parking = parking;
  property.details.accessiblity = accessiblity;
  property.details.park = park;
  property.details.pets = pets;
  property.details.natural_illumination = natural_illumination;
  property.details.public_institutes = public_institutes;
  property.details.public_transport = public_transport;
  property.details.contact = contact;

  try {
    await property.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update property.', 500)
    );
  }

  res.status(200).json({ property: property });
};

const deleteProperty = async (req, res, next) => {
  const propertyId = req.params.pid;

  let property;
  try {
    property = await Property.findById(propertyId).populate('creator');
  } catch (err) {
    return (
      new HttpError('Something went wrong, could not delete property.', 500)
    );
  }

  if (!property) {
    return next(
      new HttpError('Could not find property for this id.', 404)
    );
  }

  if (property.creator.id.toString() !== req.userData.userId) {
    return next(
      new HttpError('You are not allowed to delete this property.', 401)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await property.remove({ session: sess });
    property.creator.properties.pull(property);
    await property.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return (
      new HttpError('Something went wrong, could not delete property.', 500)
    );
  }

  res.status(200).json({ message: 'The property was successfully deleted.', propertyId: propertyId });
};

exports.getPropertyById = getPropertyById;
exports.getPropertiesByUserId = getPropertiesByUserId;
exports.getAllProperties = getAllProperties;
exports.createProperty = createProperty;
exports.updateProperty = updateProperty;
exports.deleteProperty = deleteProperty;