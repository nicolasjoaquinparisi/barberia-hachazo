const express = require('express')
const { check } = require('express-validator')
const serviceController = require('../controller/serviceController')

const router = express.Router()

// Path: api/service
router.post('/',
    [
        check('name', 'The name of the service is required').not().isEmpty(),
        check('price', 'The price of the service is required').isNumeric()
    ],
    serviceController.createService
)

router.get('/', serviceController.getServices)

router.get('/:id', serviceController.getService)

router.put('/:id',
    [
        check('id', 'The id of the client is required').not().isEmpty()
    ],
    serviceController.updateService
)

router.delete('/:id', serviceController.deleteService)

module.exports = router