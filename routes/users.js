const { userPatch,
        userGet,
        userPost,
        userDelete,
        userPut } = require('../controllers/users.controllers');
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { rolValidator, emailExist, userIdExist } = require('../helpers/db-validators');
const { textFieldsValidation } = require('../middleware/textFieldsValidation');
const { isAdminRole, hasRole } = require('../middleware/verifyUserRole');
const { jwtValidator } = require('../middleware/JWTValidator');



router.get('/', userGet);

router.post('/', [
        check('nombre', 'El nombre es un campo requerido!').not().isEmpty(),
        check('correo', 'El correo no es valido!').isEmail(),
        check('password', 'El password debe ser mas de 6 letras!').isLength({ min: 6 }),
        check('rol').custom(rolValidator),
        check('correo').custom(emailExist),
        textFieldsValidation,

], userPost);

router.put('/:id', [
        check('id', 'No es un ID de Mongo valido!').isMongoId(),
        check('id').custom(userIdExist),
        check('rol').custom(rolValidator),
        textFieldsValidation,
], userPut);

router.delete('/:id', [
        jwtValidator,
        isAdminRole,
        hasRole('ADMIN_ROLE', 'USER_ROLE'),
        check('id', 'No es un ID de Mongo valido!').isMongoId(),
        check('id').custom(userIdExist),
], userDelete)

router.patch('/', userPatch)


module.exports = router;