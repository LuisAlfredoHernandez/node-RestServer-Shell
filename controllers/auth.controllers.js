const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateJwT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body
    try {
        const { correo, nombre, img } = await googleVerify(id_token)

        //Check if user loged is registered on DB
        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            //Create google user
            const data = {
                nombre,
                correo,
                password:':p',
                img,
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }

        //Checks the user status on the DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado!'
            })
        }

        const token = await generateJwT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar!'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}