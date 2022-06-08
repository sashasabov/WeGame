const { rawListeners, findByIdAndDelete } = require('../models/games');
const Game = require('../models/games')

let index = (req, res) =>{
    Game.find({}, (err,game) => {
        if(err){
            res.status(400).json(err)
            return
        }
        res.render('index', {game})
    })
};

let show = (req, res) => {
    Game.findById(req.params.id, (err,game) =>{
        if(err){
            res.status(400).json(err)
            return
        }
    res.render('show', {game})
        })
};

let newGame = (req, res) => {
   res.render('new')
}

let create = (req, res) => {
Game.create({}, req.body,{new:true},
(err, game) =>{
    if(err){
        res.status(400).json(err)
    }
    game = req.body;
    res.redirect('/games')
})
}

let deleteGame = (req, res) => {
Game.findByIdAndDelete(req.params.id,(err, game) => {
    if(err){
        res.status(400).json(err)
        return
    }
res.redirect('/games')
    })
}

let edit = (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        if (err){
            res.status(400).json(err)
            return
        }
        res.render('edit', {game})
    })
    
}

let update = (req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body, {new: true},
        (err, game) => {
            if(err){
                res.status(400).json(err)
                return
            }
            game = req.body;
            // res.render('show', {game})
            res.redirect('/games')
        })
}

module.exports = {
    index,
    show,
    newGame,
    create,
    deleteGame,
    update,
    edit
}