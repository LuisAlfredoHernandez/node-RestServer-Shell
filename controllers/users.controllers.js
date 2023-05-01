const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const userGet = (req, res) => {
    const { q, nombre = 'no name', apikey, page = 1, limit } = req.query
    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey,
        page,
        limit
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

const userDelete = (req, res) => {
    res.json({
        msg: 'Delete API'
    })
}

const userPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

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