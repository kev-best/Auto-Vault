const axios = require('axios');
require('dotenv').config();
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const PLACE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

// Google Maps API key
const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;

// geocode an address to get latitude and longitude
async function geocodeAddress(address) {
    const resp = await axios.get(GEOCODE_URL, {
        params: { address: address, key: GOOGLE_MAPS_KEY }
    });
    const result = resp.data.results[0];
    return result ? result.geometry.location : null;
}

// find car dealerships near given coords
async function findDealerships({ lat, lng, radius = 5000 }) {
    const resp = await axios.get(PLACE_URL, {
        params: {
            location: `${lat},${lng}`,
            radius,
            type: 'car_dealer',
            key: GOOGLE_MAPS_KEY
        }
    });
    return resp.data.results;
}

module.exports = { geocodeAddress, findDealerships };