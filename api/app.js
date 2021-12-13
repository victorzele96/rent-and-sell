const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const propertyRoutes = require("./routes/property-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);
app.use("/api/property", propertyRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error accurred" });
});

app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});
