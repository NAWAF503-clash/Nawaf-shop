const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    nom: String,
    description: String,
    prix: Number,
    images: [String],
    video: String,
    couleur: String,
    taille: String,
    stock: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", ProductSchema);