const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError('Could not create user, please try again.', 500)
    );
  }

  const createdUser = new User({
    id: uuid(),
    firstName,
    lastName,
    email,
    password: hashedPassword,
    properties: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again.", 500)
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again.", 500)
    );
  }

  res.status(201).json({
    user: {
      userId: createdUser.id,
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      isAdmin: false
    }, token
  });
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

  if (!existingUser) {
    return next(
      new HttpError('Could not identify user, credentials seem to be wrong', 403)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError('Could not sign you in, please check your credentials and try again.', 500)
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError('Could not identify user, credentials seem to be wrong', 403)
    );
  }

  let isAdmin = false;
  if (existingUser.role && existingUser.role === 'admin') {
    isAdmin = true;
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        isAdmin
      },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError("Signing in failed, please try again.", 500)
    );
  }

  res.json({
    user: {
      userId: existingUser.id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      isAdmin
    }, token
  });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.signin = signin;