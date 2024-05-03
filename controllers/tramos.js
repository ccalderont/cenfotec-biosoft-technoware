const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};
const { ObjectId } = require('mongoose').Types;

const Tramo = require('../models/tramo');
const Usuario = require('../models/usuario');

const mailController = require('./mail');


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


exports.getAllTramos = async (req, res) => {
    try{
        let tramos = await Tramo.find({usuario:req.body.idUsuario !== '' ? req.body.idUsuario: {$ne: null} }).populate('usuario');

        res.status(200).send(tramos);
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
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
        const stores = await Tramo.find({estado: 'pendiente'}).populate('usuario');
        const curatedStores = stores.map(store => {
            return {
                id: store.id,
                fecha: new ObjectId(store._id).getTimestamp(),
                nombre: store.nombre,
                descripcion: store.descripcion,
                usuario: store.usuario === null ? null : store.usuario.nombre + " " + store.usuario.apellidos + "<br><a href='mailto:" + store.usuario.email+"'>" + store.usuario.email + "</a>",
                direccion: store.direccion,
                permisos: store.usuario === null ? null : store.usuario.permisos
            }
        });
        res.status(200).send({stores: curatedStores});
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
        //generate random password for the vendor
        let password = Math.random().toString(36).slice(-8);
        tramo.usuario.password = password;
        await tramo.save();
        await tramo.usuario.save();

        //send email to the vendor
        mailController.sendApprovedStoreEmail(tramo);

        res.status(200).send({message: 'Tramo aprobado con éxito'});

    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }

}

exports.postRejectTramo = async (req, res) => {
    try{
        const tramo = await Tramo.findByIdAndDelete(req.body.tramo).populate('usuario');
        await Usuario.findByIdAndDelete(tramo.usuario._id);

        //send email to the vendor
        mailController.sendRejectedStoreEmail(tramo, req.body.razon);

        res.status(200).send({message: 'Tramo rechazado con éxito'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}


exports.changeTramoStatus = async (req, res) => {
    try{
        const tramo = await Tramo.findById(req.body.idTramo).populate('usuario');
        tramo.estado = tramo.estado === 'activo' ? 'inactivo' : 'activo';
        await tramo.save();
        const vendor = tramo.usuario;

        //send eamil to the vendor
        mailController.sendTramoStatusChangeEmail(tramo, vendor, req.body.razon);
        res.status(200).send({message: 'Estado actualizado'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}
