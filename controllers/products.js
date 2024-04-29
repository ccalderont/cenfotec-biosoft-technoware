const path = require('path');
const mongoose = require('mongoose');

const options = {
    root: path.join(__dirname, '../views')
};
const { ObjectId } = mongoose.Types;

const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

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

// Get active and still on stock products for the catalog
exports.getActiveProducts = async (req, res) => {
    try{
        let products = await Producto.find({
            estado: 'activo',
            cantidadDisponible: {$gt: 0}, // Only show products that are still on stock
        }).populate('categoria tramo');
        products = products.filter(product => product.tramo.estado === "activo");
        // Randomize the products, so they don't show in any particular order
        products.sort(()=> Math.random() - 0.5); 
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

exports.getUserProducts = async (req, res) => {
    try{
        let usuario = await Usuario.findById(req.body.usuario).populate('tramo');
        let products = await Producto.find({
            categoria: req.body.categoria !== "" ? req.body.categoria : {$ne: null},
            tramo: usuario.tramo.id
        }).populate('categoria').sort({nombre: 1});
        res.status(200).send({products: products});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.updateProductQuantity = async (req, res) => {
    try{
        await Producto.findByIdAndUpdate(req.body.producto, {cantidadDisponible: req.body.cantidad});
        res.status(200).send({message: 'Producto actualizado'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.updateProductPrice = async (req, res) => {
    try{
        await Producto.findByIdAndUpdate(req.body.producto, {precioBruto: req.body.precio});
        res.status(200).send({message: 'Producto actualizado'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.updateProductTax = async (req, res) => {
    try{
        await Producto.findByIdAndUpdate(req.body.producto, {impuesto: req.body.impuesto});
        res.status(200).send({message: 'Producto actualizado'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.getPendingProducts = async (req, res) => {
    try{
        let products = await Producto.find({estado: 'pendiente'}).populate('tramo categoria');
        products = products.map(product => {
            return {
                id: product._id,
                fecha: new ObjectId(product._id).getTimestamp(),
                nombre: product.nombre,
                foto: product.foto,
                descripcion: product.descripcion,
                categoria: product.categoria.nombre,
                unidadMedida: product.unidadMedida,
                precioBruto: product.precioBruto,
                tramo: product.tramo.nombre,
                impuesto: product.impuesto,
            }
        });
        res.status(200).send({products: products});
    }
    catch(error){
        console.log(error);
    }
}

exports.postApproveProduct = async (req, res) => {
    try{
        const producto = await Producto.findById(req.body.producto);
        producto.estado = 'activo';
        await producto.save();
        res.status(200).send({message: 'Producto aprobado con éxito'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}