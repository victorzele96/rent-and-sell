const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const usersControllers = require('../controllers/users-controllers');

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  [
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  usersControllers.signup
);

router.post('/signin', usersControllers.signin);

module.exports = router;