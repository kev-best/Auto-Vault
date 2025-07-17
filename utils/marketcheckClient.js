const axios = require('axios');
require('dotenv').config();
const MARKET_URL = 'https://mc-api.marketcheck.com/v2/search/car/active';
const MARKET_KEY = process.env.MARKETCHECK_API_KEY;

async function searchVehicles(params) {
    const resp = await axios.get(MARKET_URL, {
        params: {
            api_key: MARKET_KEY,
            ...params,
            include_relevant_links: true
        }
    });
    return resp.data;
}

async function getVehicleByVin(vin) {
    const resp = await axios.get(`${MARKET_URL}/win/${encodeURIComponent(vin)}`, { params: { api_key: MARKET_KEY } });
    return resp.data;
}

module.exports = {
    searchVehicles,
    getVehicleByVin
};