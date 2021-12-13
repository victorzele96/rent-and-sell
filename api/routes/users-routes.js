const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/users-controller");

router.get("/:uid", userControllers.getUserById);

module.exports = router;
