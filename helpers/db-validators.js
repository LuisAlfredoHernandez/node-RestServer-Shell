const Role = require('../models/rol');
const Usuario = require('../models/usuario');

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
    const existUserId = await Usuario.findById( id )
    if (!existUserId) {
        throw new Error(`El Id: ${id} no existe!`)
    }

}

module.exports = {
    rolValidator,
    emailExist,
    userIdExist
}