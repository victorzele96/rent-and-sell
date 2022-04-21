const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_PROPERTIES = [
  {
    id: "p1",
    description: "One of the most impressive villas in Los Santos.",
    images: [],
    address: "5454 Interstate 55 North Frontage Rd, Jackson, MS 39211, United States",
    location: {
      lat: 31.2530,
      lng: 34.7915
    },
    details: {
      listing_status: "Sale",
      creation_date: "3 hours",
      price: 1_750_000,
      renovated: true,
      rooms_num: 3,
      room_size: 75,
      property_type: "house",
      stories: "2",
      floor: "",
      parking: true,
      accessiblity: true,
      natural_illumination: true,
      pets: false,
      park: false,
      public_transport: true,
      public_institutes: true,
      contact: "+972111111112"
    },
    creator: "u1"
  },
  {
    id: "p2",
    description: "1234dsa",
    images: [],
    address: "123 Interstate 55 North Frontage Rd, Jackson, MS 39211, United States",
    location: {
      lat: 31.2,
      lng: 34.7
    },
    details: {
      listing_status: "Rent",
      creation_date: "3 hours",
      price: 2100,
      renovated: true,
      rooms_num: 3,
      room_size: 75,
      house_type: "apartment",
      stories: "",
      floor: "1",
      parking: false,
      accessiblity: false,
      natural_illumination: true,
      pets: true,
      park: true,
      public_transport: true,
      public_institutes: true,
      contact: "+972111111112"
    },
    creator: "u2"
  },
];

const getPropertiesByUserId = (req, res, next) => {
  const userId = req.params.uid // params = { uid: 'u1' }
  const properties = DUMMY_PROPERTIES.filter(p => p.creator === userId);

  if (!properties || properties.length === 0) {
    return next(
      new HttpError("Could not find a property for the provided user id.", 404)
    );
  }

  res.json({ properties });
};

const getPropertyById = (req, res, next) => {
  const propertyId = req.params.pid // params = { pid: 'h1' }
  const property = DUMMY_PROPERTIES.find(p => p.id === propertyId);

  if (!property) {
    return next(
      new HttpError("Could not find a property for the provided id.", 404)
    );
  }

  res.json({ property });
};

const getAllProperties = (req, res, next) => {
  console.log('GET Request in Property');
  res.json({ properties: DUMMY_PROPERTIES });
};

const createProperty = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { description, address, images, creator, details, coordinates } = req.body;
  const {
    listing_status, price, rooms_num, room_size,
    house_type, floor, stories, renovated, parking,
    accessiblity, park, pets, natural_illumination,
    public_institutes, public_transport, contact
  } = details;

  const createdProperty = {
    id: uuid(),
    description,
    address,
    images,
    location: coordinates,
    creator,
    details: {
      listing_status,
      price,
      rooms_num,
      room_size,
      house_type,
      floor,
      stories,
      renovated,
      parking,
      accessiblity,
      park,
      pets,
      natural_illumination,
      public_institutes,
      public_transport,
      contact
    }
  };

  DUMMY_PROPERTIES.push(createdProperty);

  res.status(201).json({ property: createdProperty });
};

const updateProperty = (req, res, next) => {
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

  const updatedProperty = { ...DUMMY_PROPERTIES.find(p => p.id === propertyId) };
  const propertyIndex = DUMMY_PROPERTIES.findIndex(p => p.id === propertyId);

  updatedProperty.description = description;
  updatedProperty.images = images.map(image => image);
  updatedProperty.details.listing_status = listing_status;
  updatedProperty.details.price = price;
  updatedProperty.details.rooms_num = rooms_num;
  updatedProperty.details.room_size = room_size;
  updatedProperty.details.floor = floor;
  updatedProperty.details.stories = stories;
  updatedProperty.details.renovated = renovated;
  updatedProperty.details.parking = parking;
  updatedProperty.details.accessiblity = accessiblity;
  updatedProperty.details.park = park;
  updatedProperty.details.pets = pets;
  updatedProperty.details.natural_illumination = natural_illumination;
  updatedProperty.details.public_institutes = public_institutes;
  updatedProperty.details.public_transport = public_transport;
  updatedProperty.details.contact = contact;

  DUMMY_PROPERTIES[propertyIndex] = updatedProperty;
  res.status(200).json({ property: updatedProperty });
};

const deleteProperty = (req, res, next) => {
  const propertyId = req.params.pid;

  DUMMY_PROPERTIES = DUMMY_PROPERTIES.filter(p => p.id !== propertyId);
  res.status(200).json({ message: 'The property was successfully deleted.', propertyId: propertyId });
};

exports.getPropertyById = getPropertyById;
exports.getPropertiesByUserId = getPropertiesByUserId;
exports.getAllProperties = getAllProperties;
exports.createProperty = createProperty;
exports.updateProperty = updateProperty;
exports.deleteProperty = deleteProperty;