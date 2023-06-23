const { response } = require("express");


const isAdminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(401).json({
            msg: `Se intenta verificar el rol sin validar el token primero!`
        })
    }

    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario: ${nombre} no es administrador, no tiene este permiso en la DB!`
        })
    }
    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}