const { request, response } = require("express")
const jwt = require('jsonwebtoken')

const jwtValidator = (req = request, res = response, next) => {
    const token = req.header('Api-key')
    if (!token) {
        return res.status(401).json({
            msg: 'El usuario no esta autorizado!'
        })
    } else {
        try {
            jwt.verify(token, process.env.SECRETORPRIVATEKEY)
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