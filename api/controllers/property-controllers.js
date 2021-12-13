const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_PROPERTY = [
  {
    id: "p1",
    title: "some",
    description: "some2",
    address: "some",
    creator: "u1",
  },
  {
    id: "p2",
    title: "some2",
    description: "some22",
    address: "some",
    creator: "u2",
  },
];

const getPropertyById = (req, res, next) => {
  const propertyId = req.params.pid;
  const property = DUMMY_PROPERTY.find((p) => p.id === propertyId);

  if (!property) {
    throw new HttpError("Could not find a property for the provided id.", 404);
  }

  res.json({ property });
};

const getPropertiesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const properties = DUMMY_PROPERTY.filter((p) => p.creator === userId);

  if (!properties || properties.length === 0) {
    return next(
      new HttpError("Could not find a property for the provided user id.", 404)
    );
  }

  res.json({ properties });
};

const createProperty = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description, address, creator } = req.body;

  const createdProperty = {
    id: uuid(),
    title,
    description,
    address,
    creator,
  };

  DUMMY_PROPERTY.push(createdProperty);
  res.status(201).json({ property: createdProperty });
};

const updateProperty = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description, address } = req.body;
  const propertyId = req.params.pid;

  const updatedProperty = {
    ...DUMMY_PROPERTY.find((p) => p.id === propertyId),
  };
  const propertyIndex = DUMMY_PROPERTY.findIndex((p) => p.id === propertyId);

  updatedProperty.title = title;
  updatedProperty.description = description;
  updatedProperty.address = address;

  DUMMY_PROPERTY[propertyIndex] = updatedProperty;

  res.status(200).json({ property: updatedProperty });
};

const deleteProperty = (req, res, next) => {
  const propertyId = req.params.pid;

  if (DUMMY_PROPERTY.find((p) => p.id === propertyId)) {
    throw new HttpError("Could not find a property for that id.", 404);
  }

  DUMMY_PROPERTY = DUMMY_PROPERTY.filter((p) => p.id !== propertyId);

  res.status(200).json({ message: "Property deleted." });
};

exports.getPropertyById = getPropertyById;
exports.getPropertiesByUserId = getPropertiesByUserId;
exports.createProperty = createProperty;
exports.updateProperty = updateProperty;
exports.deleteProperty = deleteProperty;
