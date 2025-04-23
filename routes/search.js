const { router } = require("express");
const { buscar } = require("../controllers/search");

const router = router();

router.get("/:coleccion/:termino", buscar);

module.exports = router;
