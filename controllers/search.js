const { response } = require("express");
const { Usuario } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermetidias = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    res.json({
      results: [usuario ? [usuario] : []],
    });
  }
};

const buscar = (req, res = response) => {
  const { collecion, termino } = req.params;
  if (!coleccionesPermetidias.includes(collecion)) {
    res.status(400).json({
      msg: `las colecciones permitidas son: ${coleccionesPermetidias}`,
    });
  }

  switch (collecion) {
    case "usuario":
      buscarUsuarios(termino, res);
      break;
    case "categoria":
      break;
    case "productos":
      break;
    default:
      break;
  }

  res.json({
    msg: "Buscar....",
  });
};
