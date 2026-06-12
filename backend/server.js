require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Order = require("./models/order");
const Product = require("./models/product");


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


app.post("/add-product", async (req, res) => {

    try {

        const { nom, description, prix, images, video, couleurs, tailles, stock } = req.body;

        const product = new Product({
            nom,
            description,
            prix,
            images,
            video,
            couleurs,
            tailles,
            stock
        });

        await product.save();

        res.json({
            success: true,
            message: "Produit ajouté"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});



app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
});

app.delete("/product/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Produit supprimé"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

app.get("/commandes", async (req, res) => {

    try {

        const commandes = await Order.find().sort({ date: -1 });

        res.json(commandes);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

app.delete("/commande/:id", async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        res.json({
            success:true,
            message:"Commande supprimée"
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
});

app.delete("/commandes", async (req, res) => {

    try {

        await Order.deleteMany();

        res.json({
            success:true,
            message:"Historique supprimé"
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
});

app.put("/commande/:id", async (req,res)=>{

    try{

        await Order.findByIdAndUpdate(
            req.params.id,
            {
                statut:"Livré"
            }
        );

        res.json({
            success:true
        });

    }catch(error){

        res.status(500).json({
            success:false
        });
    }
});


const PORT = process.env.PORT || 3000;

app.put("/commande/:id", async (req,res)=>{

    try{

        await Order.findByIdAndUpdate(
            req.params.id,
            {
                statut:"Livré"
            }
        );

        res.json({
            success:true
        });

    }catch(error){

        res.status(500).json({
            success:false
        });
    }
});

app.put("/product/:id", async (req,res)=>{

    try{

        await Product.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.json({
            success:true,
            message:"Produit modifié"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

});


app.listen(PORT, () => {
    console.log(`Serveur lancé sur ${PORT}`);
});