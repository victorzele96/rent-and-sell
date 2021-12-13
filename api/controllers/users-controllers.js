const { uuid } = require("uuidv4");

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

const getUser = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);

  if(hasUser){
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    	id: uuid(),
      firstName,
      lastName,
      email,
      password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({user: createdUser});
}

const signin = (req, res, next) => {
  const {email, password} = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if(!identifiedUser || identifiedUser.password !== password){
    throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
  }
  
  res.json({message: 'Signed in!'});
}

exports.getUser = getUser;
exports.signup = signup;
exports.signin = signin;