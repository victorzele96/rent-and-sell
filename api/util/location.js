const axios = require("axios");
const HttpError = require("../models/http-error");

const getCoordsForAddress = async (address) => {
  const response = await axios.get(`https://maps.google.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY_GEOCODE}`);

  const data = response.data;
  console.log(data)
  if (!data || data.status === 'ZERO_RESULTS') {
    throw new HttpError('Could not find location for the specified address.', 422);
  }

  return {
    formatted_address: data.results[0].formatted_address,
    coordinates: data.results[0].geometry.location
  };
};

module.exports = getCoordsForAddress;