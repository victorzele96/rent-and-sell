const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Get req in property');
    res.json({message: 'it works'});
});

module.exports = router;