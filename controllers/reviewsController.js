const Game = require('../models/games');
const User = require('../models/users');
//const Review = require('../models/games')

let create = (req, res) => {
    Game.findById(req.params.id, (err,game) => {
        if(err){
            res.status(400).json(err)
            return
        }
        res.locals.user = req.user;
        const author = new User(req.user)
        author.save((err)=>{if (err){ return res.status(400).json(err)}})
        game.reviews.push(req.body);
        game.reviews[game.reviews.length-1].author = author;
        game.save((err) => {if(err){console.log(err)}})
        console.log(game.reviews)
        res.redirect(`/games/${game._id}`)
    })
}
        //const body.author = author.name; 
       //game.populate({path: 'reviews', populate:{ path: 'author', model: 'User'}}, (err) => {if(err){console.log(err)}} )
       //game.save((err) => {if(err){console.log(err)}})
        //index = game.reviews.length-1;
        // game.populate(`reviews.${index}.author`)
        //console.log(game.reviews)
        //console.log(game.populated('author'))
       


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