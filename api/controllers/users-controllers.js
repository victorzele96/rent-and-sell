const mongoose = require('mongoose');
const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getPublicIds = require('../util/public-id');
const cloudinary = require("../util/cloudinary");

const HttpError = require("../models/http-error");

const Property = require('../models/property');
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
        isAdmin: false
      },
      process.env.JWT_KEY,
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
      process.env.JWT_KEY,
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
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { firstName, lastName, email } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId)
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update user.', 500)
    );
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update user.', 500)
    );
  }

  res.status(200).json({ user: user });
};

const deleteUser = async (req, res, next) => {

  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete user.', 500)
    );
  }

  if (!user) {
    return next(
      new HttpError('Could not find user for this id.', 404)
    );
  }

  if (!req.userData.isAdmin) {
    return next(
      new HttpError('You are not allowed to delete this user.', 401)
    );
  }


  // let deletePropertiesByUserId = user.properties.map(async propertyId => {
  //   let property;
  //   try {
  //     property = await Property.findById(propertyId).populate('creator');
  //   } catch (err) {
  //     return (
  //       new HttpError('Something went wrong, could not delete user.', 500)
  //     );
  //   }

  //   if (!property) {
  //     return next(
  //       new HttpError('Could not find property for this id.', 404)
  //     );
  //   }

  //   return property;
  // });

  // deletePropertiesByUserId.map(promise => promise.then(async property => {
  //   const public_ids = getPublicIds(property.images);
  //   public_ids.map(public_id => cloudinary.uploader.destroy(public_id).then(console.log('destroyed')));

  //   await user.populate('properties');

  //   try {
  //     const sess = await mongoose.startSession();
  //     sess.startTransaction();
  //     await property.remove({ session: sess });
  //     property.creator.properties.pull(property);
  //     await property.creator.save({ session: sess });
  //     await sess.commitTransaction();
  //   } catch (err) {
  //     console.log(err);
  //     return next(
  //       new HttpError('Something went wrong, could not delete property.', 500)
  //     );
  //   }
  // }));

  try {
    await user.remove();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, could not delete user.', 500)
    );
  }

  res.status(200).json({ message: 'The user was successfully deleted.', userId: userId });
};

module.exports = {
  getUsers,
  signup,
  signin,
  updateUser,
  deleteUser,
};