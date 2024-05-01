const path = require('path');
const options = {
    root: path.join(__dirname, '../views')
};

const Producto = require('../models/producto');
const Impuesto = require('../models/impuesto');
const Categoria = require('../models/categoria');

exports.getIndex = (req, res) => {
    const fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getCatalogue = (req, res) => {
    const fileName = 'catalogo.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

//Sobre Nosotros CNP
exports.getAboutUsCNP = (req, res) => {
    const fileName = 'SobreNosotros.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

//Sobre Nosotros Technoware
exports.getAboutUsTech = (req, res) => {
    const fileName = 'sobreNosotrosTechnoware.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}


exports.getAllProducts = async (req, res) => {
    try{
        let products = null;
        if(req.body.filter){
            products = await Producto.find({
                estado: 'activo', 
                categoria: req.body.filter,
            }).populate('categoria tramo');
        }
        else{
            products = await Producto.find({estado: 'activo'}).populate('categoria tramo');
        }
        
        res.status(200).send(products);
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.getImpuestoAdmin = async (req, res) => {
    try{
        const impuesto = await Impuesto.findOne();
        res.status(200).send({impuesto: impuesto.impuesto});
    }
    catch(error){
        console.log(error);
    }
}

exports.getActiveCategories = async (req, res) => {
    try{
        const categorias = await Categoria.find({activo: true});
        res.status(200).send({categorias: categorias});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}