const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    firstName: "Dear",
    lastName: "Guest",
    email: "test@gmail.com",
    password: "123456",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);

  if (hasUser) {
    return next(
      new HttpError('Could not create user, email already exists.', 422)
    );
  }

  if (password !== confirmPassword) {
    return next(
      new HttpError('Could not create user, passwords does not match.', 422)
    );
  }

  const createdUser = {
    id: uuid(),
    firstName,
    lastName,
    email,
    password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
}

const signin = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError('Could not identify user, credentials seem to be wrong', 401)
    );
  }

  res.json({ message: 'Signed in!' });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.signin = signin;