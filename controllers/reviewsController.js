const Game = require('../models/games');
const User = require('../models/users');
//const Review = require('../models/games')

let create = (req, res) => {
    Game.findById(req.params.id, (err,game) => {
        if(err){
            res.status(400).json(err)
            return
        }
        console.log(req.user)
        req.body.author = req.user._id;
        game.reviews.push(req.body);
        game.save((err) => {if(err){console.log(err)}})
        console.log(game.reviews)
        res.redirect(`/games/${game._id}`)
    })
}


let deleteOne = (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        if(err) {
            res.status(400).json(err)
            return
        }
        game.reviews.id(req.params.reviewId).remove()
        game.save((err) => {if(err){console.log(err)}})
        res.redirect(`/games/${game._id}`)
    })
}


module.exports = {
    create,
    deleteOne
}