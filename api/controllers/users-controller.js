const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    firstName: "Dear",
    lastName: "Guest",
    email: "test@gmail.com",
    password: "123456",
  },
];

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((u) => {
    return u.id === userId;
  });
  res.json({ user });
};

exports.getUserById = getUserById;