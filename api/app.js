const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const propertyRoutes = require("./routes/property-routes");
const userRoutes = require("./routes/users-routes");

const app = express();
const PORT = process.env.PORT || 9000;

// With middleware
app.use("/api/users", userRoutes);

app.use("/api/property", propertyRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error accurred' });
});

app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});
