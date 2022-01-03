const response = require('express');

const userGet = (req, res)=> {
    const {q, nombre = 'no name', apikey, page=1, limit} = req.query
    res.json({
        msg:'get API',
        q,
        nombre,
        apikey, 
        page,
        limit
    })
} 

const userPost = (req, res)=> {
    const {nombre, edad} = req.body
    res.json({
        msg:'post API',
        nombre,
        edad
    })
} 

const userDelete = (req, res)=> {
    res.json({
        msg:'Delete API'
    })
} 

const userPut = (req, res)=> {
    res.json({
        msg:'put API'
    })
} 

const userPatch = (req, res)=> {
    res.json({
        msg:'patch API'
    })
} 


module.exports = {
    userPost,
    userPut,
    userPatch,
    userDelete,
    userGet
}