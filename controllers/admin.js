const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

const Categoria = require('../models/categoria');
const Impuesto = require('../models/impuesto');

exports.getImpuestoAdmin = (req, res) => {
    const fileName = 'impuestAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.updateImpuestoAdmin = async (req, res) => {
    try{
        const impuesto = await Impuesto.findOne();
        impuesto.impuesto = req.body.impuesto;
        impuesto.save();
        res.status(200).send({message: 'Impuesto actualizado'});
    }catch(err){
        console.log(err);
        res.status(500).send({message: 'Error al actualizar el impuesto'});
    }
}

exports.getRegistrarCategoria = (req, res) => {
    const fileName = 'registroCategoria.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getAllCategorias = async (req, res) => {
    const categories = await Categoria.find();
    res.status(200).send(categories);
}

exports.saveCategories = async (req, res) => {
    const changes = req.body.changes;
    changes.forEach(async change => {
        let category = await Categoria.findOne({nombre: change.nombre});
        if (category) {
            category.activo = change.activo;
            await category.save();
        } else {
            category = new Categoria(change);
            await category.save();
        }
    });  
    res.status(200).send('Changes saved');
}

exports.getPendingRequests = (req, res) => {
    const fileName = 'solicitudesPendientes.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}