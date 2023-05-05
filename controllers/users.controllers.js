const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const userGet = async (req, res) => {
    const { limite, desde } = req.query
    const query = { estado: true }
    const [usuario, total] = await Promise.all([
        Usuario.find(query)
            .skip(desde)
            .limit(limite),
        Usuario.countDocuments(query)
    ])

    res.json({
        total,
        usuario
    })
}

const userPost = async (req, res) => {
    const { password, nombre, correo, rol } = req.body
    const usuario = new Usuario({ password, nombre, correo, rol })

    //Encrypting user's password
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    // Saving user to DB
    usuario.save();

    res.json({
        msg: 'post API',
        usuario
    })
}

const userDelete = async (req, res) => {
    const { id } = req.params
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    res.json({
        usuario
    })
}

const userPut = async (req, res) => {
    const { id } = req.params;
    const { google, correo, ...rest } = req.body;

    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest)

    res.json({
        msg: 'put API',
        usuario
    })
}

const userPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    })
}


module.exports = {
    userPost,
    userPut,
    userPatch,
    userDelete,
    userGet
}