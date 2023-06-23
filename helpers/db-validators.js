const { Categoria, Usuario } = require('../models');
const Role = require('../models/rol');


const rolValidator = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en el DB`)
    }
}

// Verificar si el correo existe
const emailExist = async (correo = '') => {
    const existEmail = await Usuario.findOne({ correo })
    if (existEmail)
        throw new Error(`El correo: ${correo} ya esta registrado!`)
}

const userIdExist = async (id) => {
    const existUserId = await Usuario.findById(id)
    if (!existUserId) {
        throw new Error(`El Id: ${id} no existe!`)
    }

}

const categoryIdExist = async (id) => {
    const existCategoryId = await Categoria.findById(id)
    if (!existCategoryId) {
        throw new Error(`La Categoria con el ID: ${id} no existe en la BD!`)
    }
}

const categoryNameExist = async (nombre) => {
    const existCategoryName = await Categoria.findOne({ nombre })
    if (existCategoryName) {
        throw new Error(`La Categoria con el nombre: ${nombre}, ya existe en la Base de Datos!`)
    }
}

module.exports = {
    rolValidator,
    emailExist,
    userIdExist,
    categoryIdExist,
    categoryNameExist
}