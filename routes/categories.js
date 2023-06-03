const { Router } = require('express');
const { jwtValidator } = require('../middleware/JWTValidator');
const { check } = require('express-validator');
const { categoryIdExist, categoryNameExist } = require('../helpers/db-validators');
const { textFieldsValidation, isAdminRole } = require('../middleware');
const router = Router();
const { createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory } = require('../controllers/categories.controller');


router.get('/', getCategories)

router.get('/:id', [
    check('id', 'No es un id de Mongo valido!').isMongoId(),
    check('id').custom(categoryIdExist),
    textFieldsValidation
],
    getCategoryById
)

router.post('/', [
    jwtValidator,
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre').custom(categoryNameExist),
    textFieldsValidation
],
    createCategory
)

router.put('/:id', [
    jwtValidator,
    check('id', 'No es un id de Mongo valido!').isMongoId(),
    check('id').custom(categoryIdExist),
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre').custom(categoryNameExist),
    textFieldsValidation
],
    updateCategory
)

router.delete('/:id', [
    jwtValidator,
    isAdminRole,
    check('id', 'No es un id de Mongo valido!').isMongoId(),
    check('id').custom(categoryIdExist),
    textFieldsValidation
],
    deleteCategory
)

module.exports = router;