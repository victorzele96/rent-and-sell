const HttpError = require("../models/http-error");

const API_KEY = '';

const getCoordsForAddress = async (address) => {
  const baseUrl = 'https://nominatim.openstreetmap.org/search';
  const params = {
    q: address,
    format: 'geocodejson'
  }
  // TODO: adjust the code to node geocoder
  try {
    const response = await fetch(`${baseUrl}?${params.q}&${params.format}`);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
  // const data = response.data;

  // if (!data || data.status === 'ZERO_RESULTS') {
  //   throw new HttpError('Could not find location for the specified address.', 422);
  // }

  // const coordinates = data.response[0].geometry.location;

  // return coordinates;
};

module.exports = getCoordsForAddress;