const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const clienteController = require('../controller/clienteController')

// Path: api/clientes
router.post('/',
    [
        check('nombre', 'El nombre del cliente es requerido').not().isEmpty(),
        check('apellido', 'El apellido del cliente es requerido').not().isEmpty(),
        check('dni', 'El dni del cliente es requerido').not().isEmpty(),
        check('celular', 'El celular del cliente es requerido').not().isEmpty(),
    ],
    clienteController.crearCliente
)

router.get('/', clienteController.obtenerClientes)

router.put('/:id',
    [
        check('nroCliente', 'El número de cliente es requerido').not().isEmpty()
    ],
    clienteController.actualizarCliente
)

router.delete('/:id', clienteController.eliminarCliente)

module.exports = router