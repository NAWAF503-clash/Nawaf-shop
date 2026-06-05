require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Order = require("./models/order");



const app = express();

app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connecté");
})
.catch((err) => {
    console.error("Erreur MongoDB :", err);
});



app.post("/commande", async (req, res) => {

    try {

        const { nom, numero, adresse, produits } = req.body;

        const commande = new Order({
            nom,
            numero,
            adresse,
            produits
        });

        await commande.save();

        res.json({
            success: true,
            message: "Commande enregistrée"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });

    }

});
app.get("/", (req, res) => {
    res.send("Serveur OK");
});



app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log("Erreur users :", error);
        res.status(500).json({
            error: error.message
        });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur ${PORT}`);
});