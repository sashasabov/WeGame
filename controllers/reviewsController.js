const Game = require('../models/games')


let create = (req, res) => {
    Game.findById(req.params.id, (err,game)=>{
        if(err){
            res.status(400).json(err)
            return
        }
        game.reviews.push(req.body);
        game.save((err)=>{console.log(err)})
        // console.log(reviews)
        res.redirect(`/games/${game._id}`)
    })
    
}

module.exports = {
    create
}