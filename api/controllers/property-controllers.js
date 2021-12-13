const HttpError = require("../models/http-error");

const DUMMY_PROPERTY = [
  {
    id: "p1",
    title: "some",
    description: "some2",
    creator: "u1",
  },
  {
    id: "p2",
    title: "some2",
    description: "some22",
    creator: "u2",
  },
];

const getPropertyById = (req, res, next) => {
  const propertyId = req.params.pid;
  const property = DUMMY_PROPERTY.find((p) => {
    return p.id === propertyId;
  });

  if (!property) {
    throw new HttpError("Could not find a property for the provided id.", 404);
  }

  res.json({ property });
};

const getPropertyByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const property = DUMMY_PROPERTY.find((p) => {
    return p.creator === userId;
  });

  if (!property) {
    return next(
      new HttpError("Could not find a property for the provided user id.", 404)
    );
  }

  res.json({ property });
};

exports.getPropertyById = getPropertyById;
exports.getPropertyByUserId = getPropertyByUserId;