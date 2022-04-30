const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(
      new HttpError('Fetching users failed, please try again later.', 500)
    );
  }
  res.json({ users: users });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { firstName, lastName, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError("User exists already, please sign in instead.", 422)
    );
  }

  const createdUser = new User({
    id: uuid(),
    firstName,
    lastName,
    email,
    password,
    properties: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again.", 500)
    );
  }

  res.status(201).json({ user: createdUser });
}

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Signing in failed, please try again later.", 500)
    );
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError('Could not identify user, credentials seem to be wrong', 401)
    );
  }

  res.json({ message: 'Signed in!', user: existingUser });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.signin = signin;