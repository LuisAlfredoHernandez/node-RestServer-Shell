const { Router } = require('express');

const router = Router();

const { userPatch,
        userGet,
        userPost,
        userDelete,
        userPut } = require('../controllers/users.controllers');
const { check } = require('express-validator');
const Role = require('../models/rol');
const { textFieldsValidation } = require('../middleware/textFieldsValidation');

router.get('/', userGet);

router.post('/', [
        check('nombre', 'El nombre es un campo requerido!').not().isEmpty(),
        check('correo', 'El correo no es valido!').isEmail(),
        check('password', 'El password debe ser mas de 6 letras!').isLength({ min: 6 }),
        check('rol').custom(async (rol = '') => {
                const existeRol = await Role.findOne({rol})
                if (!existeRol) {
                        throw new Error(`El rol ${rol} no esta registrado en el DB`)
                }
        }),
        textFieldsValidation
], userPost);

router.put('/:id', userPut);

router.delete('/', userDelete)

router.patch('/', userPatch)

module.exports = router;