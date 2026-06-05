const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    nom: String,
    description: String,
    prix: Number,
    image: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", ProductSchema);