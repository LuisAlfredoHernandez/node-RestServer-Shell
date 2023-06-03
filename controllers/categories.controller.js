const { response } = require("express");
const { Categoria } = require("../models");


const getCategories = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true }
    const [categorias, total] = await Promise.all([
        Categoria.find(query)
            .populate('usuario')
            .skip(desde)
            .limit(limite),
        Categoria.countDocuments(query)
    ])
    res.status(201).json({
        total,
        categorias,
    })
}

const getCategoryById = async (req, res = response) => {
    const id = req.params.id;
    const categoryDB = await Categoria.findById(id).populate('usuario')
    res.status(201).json(categoryDB)
}

const createCategory = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria)
}

const updateCategory = async (req, res = response) => {
    const { nombre } = req.body;
    const id = req.params.id;
    const newCategoryName = await Categoria.findByIdAndUpdate(id, { nombre })
    res.status(201).json({
        newCategoryName
    })
}

const deleteCategory = async (req, res = response) => {
    const categoryId = req.params.id;
    const newCategoryStatus = await Categoria.findByIdAndUpdate(categoryId, { estado: false })
    res.status(201).json({
        newCategoryStatus
    })
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} 