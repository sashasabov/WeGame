const mongoose = require('mongoose');
// const User = require('./users')

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "User"
    }
},
{
    timestamps: true
})

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
<<<<<<< HEAD
        // required: true
=======
        required: true
>>>>>>> 3db90f6 (test on deploying)
    },
    img: String,
    description: String,
    age: String,
    players: String,
    category: [String],
    reviews: [reviewSchema],
    // googleId: String
})

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;