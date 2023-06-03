const { Router } = require('express');
const { jwtValidator } = require('../middleware/JWTValidator');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categories.controller');
const { check } = require('express-validator');
const { categoryIdExist, categoryNameExist } = require('../helpers/db-validators');
const { textFieldsValidation } = require('../middleware');
const router = Router();


router.get('/',
    getCategories
)

router.get('/:id', [
    check('id', 'No es un id de Mongo valido!').isMongoId(),
    check('id').custom(categoryIdExist) 
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
    check('nombre').custom(categoryNameExist)
],
    updateCategory
)

router.delete('/:id', [
    jwtValidator,
    check('id', 'No es un id de Mongo valido!').isMongoId(),
    check('id').custom(categoryIdExist)
],
    deleteCategory
)

module.exports = router;