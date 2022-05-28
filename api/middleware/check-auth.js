const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");

module.exports.userAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'.split(' ) == ['Bearer, TOKEN]

    if (!token) {
      throw new HttpError('Authentication failed!');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(
      new HttpError('Authentication failed!', 403)
    );
  }
};

module.exports.adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'.split(' ) == ['Bearer, TOKEN]

    if (!token) {
      throw new HttpError('Authentication failed!');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (!decodedToken.isAdmin) {
      throw new HttpError('Access Denied!');
    }

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(
      new HttpError('Authentication failed!', 403)
    );
  }
};