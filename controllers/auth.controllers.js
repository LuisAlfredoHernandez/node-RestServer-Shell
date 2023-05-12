const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateJwT } = require('../helpers/generate-jwt');


const login = async (req, res = response) => {
    const { password, correo } = req.body;
    try {
        //check email existence
        const usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            return res.status(400).json({
                msg: 'Password o Correo incorrectos - Correo'
            })
        }
        // check user status
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Password o Correo incorrectos - estado: falso'
            })
        }
        //check user pasword
        const isPasswordOk = bcryptjs.compareSync(password, usuario.password)
        if (!isPasswordOk) {
            return res.status(400).json({
                msg: 'Password o Correo incorrectos - Password'
            })
        }
        //Generate Json Web Token
        const token = await generateJwT(usuario.id)
        
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}