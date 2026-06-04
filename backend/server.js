require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("./models/order");

const User = require("./models/User");

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



// REGISTER
app.post("/register", async (req, res) => {

    const { email, password } = req.body;

    // Vérifie si l'email existe déjà
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "Email déjà utilisé"
        });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        password: hashed
    });

    await user.save();

    res.json({
        message: "Utilisateur créé"
    });


});
 app.post("/register", async (req, res) => { const { email, password } = req.body;
 console.log("Inscription reçue :", email); const existingUser = await User.findOne({ email }); 
 // ... 
 });

    

// LOGIN
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User introuvable" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ message: "Mot de passe faux" });

    const token = jwt.sign({ id: user._id },   process.env.JWT_SECRET,
    { expiresIn: "1d" });

    res.json({ token });
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
    const users = await User.find();
    res.json(users);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur ${PORT}`);
});