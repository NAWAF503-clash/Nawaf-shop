const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

module.exports = mongoose.model("User", UserSchema);


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