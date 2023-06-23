const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { textFieldsValidation } = require('../middleware/textFieldsValidation');
const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatorio!').isEmail(),
    check('password', 'El password es obligario!').not().isEmpty(),
    textFieldsValidation
], login);


router.post('/google', [
    check('id_token', 'id_token es requerido!').not().isEmpty(),
    textFieldsValidation
], googleSignIn);


module.exports = router