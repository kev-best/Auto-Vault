const { geocodeAddress, findDealerships } = require('../utils/googleMapsClient');

exports.listDealerships = async (req, res) => {
    try {
        let { address, lat, lng, radius } = req.query;
        let coords;
        if (address) {
            coords = await geocodeAddress(address);
            if (!coords) {
                return res.status(400).json({ error: 'Invalid address' });

            } else if (lat && lng) {
                coords = { lat: parseFloat(lat), lng: parseFloat(lng) };
            } else {
                return res.status(400).json({ error: 'Latitude and longitude are required if address is not provided' });
            }
            const dealers = await findDealerships({ lat: coords.lat, lng: coords.lng, radius });
            res.json(dealers);   
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};