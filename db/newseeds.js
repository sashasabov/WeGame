require('./connection')
const gameseeds = require('./newseeds.json');
const Game = require('../models/games')

Game.deleteMany({})
.then(()=>{
   return Game.insertMany(gameseeds)
})
.then((gameseeds) => {
    console.log(gameseeds)
})
.catch((err) =>{
    console.log(err)
}).
finally(()=>{
    process.exit()
})