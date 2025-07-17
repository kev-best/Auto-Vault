const { searchVehicles, getVehicleByVin } = require('../utils/marketcheckClient');

exports.search = async (req, res) => {
    try {
        const data = await searchVehicles(req.query);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getByVin = async (req, res) => {
    try {
        const data = await getVehicleByVin(req.params.vin);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

