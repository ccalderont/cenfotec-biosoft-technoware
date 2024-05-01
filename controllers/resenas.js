//Models
const Resena = require('../models/resena');
const Venta = require('../models/venta');
const Producto = require('../models/producto');
const Tramo = require('../models/tramo');

exports.postAgregarResena = async (req, res) => {
    try{
        //Create the new review
        const resena = new Resena({
            usuario: req.body.usuario,
            tramo: req.body.tramo,
            producto: req.body.producto,
            comentario: req.body.comentario,
            calificacion: req.body.calificacion,
            compra: req.body.compra
        });
        await resena.save();

        //Add the review to the embedded document in the sale
        const venta = await Venta.findById(req.body.venta);
        venta.productos.forEach(compra => {
            if(compra._id.toString() === req.body.compra){
                compra.resena = resena._id;
            }
        });
        await venta.save();

        await calculateProductRating(req);
        await calculateStoreRating(req);

        res.status(200).send({message: 'Reseña agregada'});
    }catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.deleteEliminarResena = async (req, res) => {
    try{
        //Delete the review
        await Resena.findByIdAndDelete(req.body.resena);

        //Delete the review from the embedded document in the sale
        const venta = await Venta.findById(req.body.venta);
        venta.productos.forEach(compra => {
            if(compra._id.toString() === req.body.compra){
                compra.resena = null;
            }
        });
        await venta.save();

        await calculateProductRating(req);
        await calculateStoreRating(req);

        res.status(200).send({message: 'Reseña eliminada'});
    }catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

async function calculateProductRating(req){
    //Calculate the new average rating for the product
    const resenasProducto = await Resena.find({producto: req.body.producto});
    let calificacionProducto = 0;
    resenasProducto.forEach(resena => {
        calificacionProducto += resena.calificacion;
    });
    if(resenasProducto.length === 0){
        calificacionProducto = 0;
    }else{
        calificacionProducto = calificacionProducto / resenasProducto.length;
    }
    await Producto.findByIdAndUpdate(req.body.producto, {calificacion: calificacionProducto});
}

async function calculateStoreRating(req){
    
        //Calculate the new average rating for the store
        const resenasTramo = await Resena.find({tramo: req.body.tramo});
        let calificacionTramo = 0;
        resenasTramo.forEach(resena => {
            calificacionTramo += resena.calificacion;
        });
        if(resenasTramo.length === 0){
            calificacionTramo = 0;
        }
        else{
            calificacionTramo = calificacionTramo / resenasTramo.length;
        }
        
        await Tramo.findByIdAndUpdate(req.body.tramo, {calificacion: calificacionTramo});
}