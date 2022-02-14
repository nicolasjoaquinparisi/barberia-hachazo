const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const clientController = require('../controller/clientController')

// Path: api/client
router.post('/',
    [
        check('name', 'The name of the client is required').not().isEmpty(),
        check('lastName', 'The last name of the client is required').not().isEmpty(),
        check('dni', 'The DNI of the client is requried').not().isEmpty(),
        check('phone', 'The phone of the client is required').not().isEmpty(),
    ],
    clientController.createClient
)

router.get('/', clientController.getClients)

router.get('/:id', clientController.getClient)

router.put('/:id',
    [
        check('id', 'The id of the client is required').not().isEmpty()
    ],
    clientController.updateClient
)

router.delete('/:id', clientController.deleteClient)

module.exports = router