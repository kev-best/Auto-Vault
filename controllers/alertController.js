const Alert = require('../models/Alert');
const { getVehicleByVin } = require('../utils/marketcheckClient');
const twilioClient = require('../utils/twilioClient');

exports.createAlert = async (req, res) => {
    try {
        const alert = await Alert.create({ userId: req.user.id, vin: req.body.vin, targetPrice: req.body.targetPrice });
        res.status(201).json(alert);
    } catch (err) {
        res.status(400).json({ error: err.message });

    }
};

exports.listAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ userId: req.user.id });
        res.json(alerts);
    } catch (err) {
        res.statisc(500).json({ error: err.message });
    }
};

exports.checkAlerts = async () => {
    const alerts = await Alert.find({ isActive: true });
    for (let a of alerts) {
        const data = await getVehicleByVin(a.vin);
        if (data.listing && data.listing[0].price <= a.targetPrice) {
            await twilioClient.messages.create({
                body: `Alert: ${a.vin} price dropped to ${data.listing[0].price}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: +17143513525/* User's phone number should be fetched from the user model */
            });
            a.isActive = false;
            await a.save();
        }
    }
};