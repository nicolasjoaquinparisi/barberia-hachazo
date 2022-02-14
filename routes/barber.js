const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const barberController = require('../controller/barberController')

// Path: api/barber
router.post('/',
    [
        check('name', 'The name of the client is required').not().isEmpty(),
        check('lastName', 'The last name of the client is required').not().isEmpty(),
        check('dni', 'The DNI of the client is requried').not().isEmpty(),
        check('phone', 'The phone of the client is required').not().isEmpty(),
        check('address', 'The address of the client is required').not().isEmpty()
    ],
    barberController.createBarber
)

router.get('/', barberController.getBarbers)

router.put('/:id',
    [
        check('id', 'The id of the barber is required').not().isEmpty()
    ],
    barberController.updateBarber
)

router.delete('/:id', barberController.deleteBarber)

module.exports = router