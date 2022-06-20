const express = require('express')
const router = express.Router();
const gamesCtrl = require('../controllers/gamesController')

router.get('/', gamesCtrl.index)

router.get('/new', gamesCtrl.newGame)

router.post('/', gamesCtrl.create)

router.delete('/:id', gamesCtrl.deleteGame)

router.get('/:id/edit', gamesCtrl.edit)

router.put('/:id', gamesCtrl.update)

router.get('/:id', gamesCtrl.show)


module.exports = router;