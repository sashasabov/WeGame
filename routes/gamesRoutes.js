

const express = require('express')
const router = express.Router();
const gamesCtrl = require('../controllers/gamesController')


router.get('/', isLoggedIn, gamesCtrl.index)

router.post('/sort',isLoggedIn, gamesCtrl.sort)

router.get('/new', isLoggedIn, gamesCtrl.newGame)

router.post('/', gamesCtrl.create)

router.delete('/:id', isLoggedIn, gamesCtrl.deleteGame)

router.get('/:id/edit', isLoggedIn, gamesCtrl.edit)

router.put('/:id', gamesCtrl.update)

router.get('/:id', gamesCtrl.show)


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/');
  }

module.exports = router;