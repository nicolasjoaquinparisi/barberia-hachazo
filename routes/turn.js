const express = require('express')
const { check } = require('express-validator')
const turnController = require('../controller/turnController')

const router = express.Router()

// Path: api/turn
router.post('/',
    [
        check('date', 'The date of the turn is required').isISO8601().toDate(),
        check('idService', 'The service is required').notEmpty(),
        check('idBarber', 'A barber is required').notEmpty(),
        check('idClient', 'A client is required').notEmpty()
    ],
    turnController.createTurn
)

router.get('/', turnController.getTurns)

router.get('/:id', turnController.getTurn)

router.put('/:id',
    [
        check('id', 'The id of a turn is required').notEmpty()
    ],
    turnController.updateTurn
)

router.delete('/:id', turnController.deleteTurn)

module.exports = router