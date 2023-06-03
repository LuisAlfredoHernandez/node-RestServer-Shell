const { request, response } = require("express")
const jwt = require('jsonwebtoken')
const Usuario = require("../models/usuario")

const jwtValidator = async (req = request, res = response, next) => {
    const token = req.header('Api-key')
    if (!token) {
        return res.status(401).json({
            msg: 'El usuario no esta autorizado! - JWT'
        })
    } else {
        try {
            const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            const usuario = await Usuario.findById(uid);
            if (!usuario) {
                return res.status(401).json({
                    msg: 'Token no valido - usuario no existe en BD'
                })
            }

            if (!usuario.estado) {
                return res.status(401).json({
                    msg: 'Token no valido - usuario con estado - false'
                })
            }

            req.usuario = usuario;
            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: 'Api key no valida!'
            })
        }
    }
}

module.exports = {
    jwtValidator
}