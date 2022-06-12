const mongoose = require('mongoose');

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
    }
},
{
    timestamps: true
})

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: String,
    description: String,
    age: String,
    players: String,
    category: Array,
    reviews: [reviewSchema],
    googleId: String
})

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;