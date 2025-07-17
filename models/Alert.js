const mongoose = require('mongoose');
const AlertSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vin: { type: String, required: true },
    targetPrice: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Alert = mongoose.model('Alert', AlertSchema);
module.exports = Alert;
