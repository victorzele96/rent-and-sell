const mongoose = require('mongoose');
const { validationResult } = require("express-validator");

const cloudinary = require("../util/cloudinary");
const getCoordsForAddress = require('../util/location');
const getPublicIds = require('../util/public-id');

const HttpError = require("../models/http-error");
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
  let coordsAndAddress;
  try {
    coordsAndAddress = await getCoordsForAddress(address);
  } catch (err) {
    return next(err);
  }

  const createdProperty = new Property({
    description,
    address: coordsAndAddress.formatted_address,
    images,
    creator: req.userData.userId,
    location: coordsAndAddress.coordinates,
    details,
    reports: [],
    ratings: [],
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

  const { description, images, details, imgsToDelete } = req.body;
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

  if (property.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError('You are not allowed to edit this property.', 401)
    );
  }

  const public_ids = getPublicIds(imgsToDelete);

  try {
    public_ids.map(public_id => cloudinary.uploader.destroy(public_id).then(console.log('destroyed')));
  } catch (err) {
    console.log(err);
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
    return next(
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

  const public_ids = getPublicIds(property.images);

  try {
    public_ids.map(public_id => cloudinary.uploader.destroy(public_id).then(console.log('destroyed')));

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await property.remove({ session: sess });
    property.creator.properties.pull(property);
    await property.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete property.', 500)
    );
  }

  res.status(200).json({ message: 'The property was successfully deleted.', propertyId: propertyId });
};

const reportProperty = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { userReport } = req.body;
  const propertyId = req.params.pid;
  const userId = req.params.uid;

  let property;
  try {
    property = await Property.findById(propertyId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not report property.', 500)
    );
  }

  if (property.creator.toString() === userId) {
    return next(
      new HttpError('You can not to report your own property.', 500)
    );
  }

  const index = property.reports.findIndex(item => item.userId.toString() === userId);
  let reports;
  if (index === -1) {
    reports = [...property.reports];
    reports.push({ report: userReport, userId });
  } else {
    return next(
      new HttpError('You have already reported this property.', 500)
    );
  }

  property.reports = reports;

  try {
    await property.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not report property.', 500)
    );
  }

  res.status(200).json({ property: property });
};

const rateProperty = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { userRating } = req.body;
  const propertyId = req.params.pid;
  const userId = req.params.uid;

  let property;
  try {
    property = await Property.findById(propertyId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not rate property.', 500)
    );
  }

  if (property.creator.toString() === userId) {
    return next(
      new HttpError('You can not to rate your own property.', 500)
    );
  }

  const index = property.ratings.findIndex(item => item.userId.toString() === userId);

  let ratings;
  ratings = [...property.ratings];
  if (index !== -1) {
    ratings.splice(index, 1);
  }
  ratings.push({ userRating, userId });

  property.ratings = ratings;

  try {
    await property.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not rate property.', 500)
    );
  }

  res.status(200).json({ property: property });
};

module.exports = {
  getPropertyById,
  getPropertiesByUserId,
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  reportProperty,
  rateProperty,
};