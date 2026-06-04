const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    nom: String,
    numero: String,
    adresse: String,
    produits: Array,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema);