const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email:String,
    password: String,
    avatar: String,
    googleId: String
})

const User = mongoose.model("User", userSchema);

module.exports = User;