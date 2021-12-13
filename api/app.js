const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const propertyRoutes = require("./routes/property-routes");
const userRoutes = require("./routes/user-routes");

const app = express();
const PORT = process.env.PORT || 9000;

// With middleware
app.use('/', function (req, res, next) {
  res.send({ "name": "victor" });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});
