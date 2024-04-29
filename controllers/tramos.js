const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};
const { ObjectId } = require('mongoose').Types;

const Tramo = require('../models/tramo');

//tramo report admin controller
exports.getReportTramosAdmin = (req, res) => {
    const fileName = 'reporteTramosAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getActiveStores = async (req, res) => {
    try{
        const stores = await Tramo.find({estado: 'activo'});
        res.status(200).send({stores: stores});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.getAllStores = async (req, res) => {
    try{
        const stores = await Tramo.find();
        res.status(200).send({stores: stores});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.getPendingTramos = async (req, res) => {
    try{
        let stores = await Tramo.find({estado: 'pendiente'}).populate('usuario');
        stores = stores.map(store => {
            return {
                id: store._id,
                fecha: new ObjectId(store._id).getTimestamp(),
                nombre: store.nombre,
                descripcion: store.descripcion,
                usuario: store.usuario.nombre + " " + store.usuario.apellidos + "<br><a href='mailto:" + store.usuario.email+"'>" + store.usuario.email + "</a>",
                direccion: store.direccion,
                permisos: store.usuario.permisos
            }
        });
        res.status(200).send({stores: stores});
    }
    catch(error){
        console.log(error);
    }
}

exports.postApproveTramo = async (req, res) => {
    try{
        const tramo = await Tramo.findById(req.body.tramo).populate('usuario');
        tramo.estado = 'activo';
        tramo.usuario.estado = 'activo';
        await tramo.save();
        await tramo.usuario.save();
        res.status(200).send({message: 'Tramo aprobado con éxito'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

