const { Router } = require("express");
const { jwtValidator } = require("../middleware/JWTValidator");
const { check } = require("express-validator");
const { textFieldsValidation, isAdminRole } = require("../middleware");
const {
  createProducts,
  getProducts,
  getProductsById,
  updateProducts,
  deleteProducts,
} = require("../controllers/producto.controller");
const {
  productIdExist,
  productNameExist,
  categoryNameExist,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido!").isMongoId(),
    check("id").custom(productIdExist),
    textFieldsValidation,
  ],
  getProductsById
);

router.post(
  "/",
  [
    jwtValidator,
    check("nombre", "El nombre es obligatorio!").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(categoryNameExist),
    textFieldsValidation,
  ],
  createProducts
);

router.put(
  "/:id",
  [
    jwtValidator,
    check("id", "No es un id de Mongo valido!").isMongoId(),
    check("id").custom(productIdExist),
    textFieldsValidation,
  ],
  updateProducts
);

router.delete(
  "/:id",
  [
    jwtValidator,
    isAdminRole,
    check("id", "No es un id de Mongo valido!").isMongoId(),
    check("id").custom(productIdExist),
    textFieldsValidation,
  ],
  deleteProducts
);

module.exports = router;
