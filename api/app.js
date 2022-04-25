const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const propertiesRoutes = require('./routes/properties-routes');
const usersRoutes = require('./routes/users-routes');

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use('/api/properties', propertiesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error accurred" });
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l6yqd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(process.env.PORT || 9000);
  })
  .catch(err => {
    console.log(err);
  });