const { Router } = require('express');
const { login } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { textFieldsValidation } = require('../middleware/textFieldsValidation');
const router = Router();



router.post('/:login', [
    check('correo', 'El correo es obligatorio!').isEmail(),
    check('password', 'El password es obligario!').not().isEmpty(),
    textFieldsValidation
], login);



module.exports = router