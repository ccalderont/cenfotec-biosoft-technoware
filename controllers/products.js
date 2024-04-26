const path = require('path');
const mongoose = require('mongoose');

const options = {
    root: path.join(__dirname, '../views')
};

const Producto = require('../models/producto');

exports.getReportProductsAdmin = (req, res) => {
    const fileName = 'reporteProductosAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getRegistrarProducto = (req, res) => {
    const fileName = 'registrarprod.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getMisProductos = (req, res) => {
    const fileName = 'misProductos.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getActiveProducts = async (req, res) => {
    try{
        let products = await Producto.find({
            estado: 'activo',
            cantidadDisponible: {$gte: 0}
        }).populate('categoria tramo');
        res.status(200).send(products);
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.postProductsFiltered = async (req, res) => {
    try{
        let products = await Producto.find({
            estado: 'activo', 
            categoria: req.body.categoria === "*" ? {$ne: null} : req.body.categoria,
            tramo: req.body.tramo === "*" ? {$ne: null} : req.body.tramo,
            nombre: {$regex: req.body.nombre, $options: 'i'},
            cantidadDisponible: {$gte: 0}
        }).populate('categoria tramo');

        res.status(200).send(products);
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.getAllProducts = async (req, res) => {
    try{
        let products = await Producto.find().populate('categoria tramo');
        res.status(200).send(products);
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}