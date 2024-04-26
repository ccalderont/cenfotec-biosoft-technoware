
const path = require('path');
const options = {
    root: path.join(__dirname, '../views')
};

const Venta = require('../models/venta');
const Producto = require('../models/producto');
const ImpuestoAdmin = require('../models/impuesto');
const Tarjeta = require('../models/tarjeta');
const Tramo = require('../models/tramo');

exports.getCarrito = (req, res) => {
    const fileName = 'carrito.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.postObtenerCarrito = async (req, res) => {
    try{
        const carrito = await Venta.findOne({
            usuario: req.body.usuario,
            estado: 'pendiente'
        }).populate('productos.producto productos.tramo');
        if(!carrito){
            return res.status(200).send({message: 'Carrito vacío'});
        }
        res.status(200).send({message: 'Carrito encontrado', carrito: carrito});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }

}

exports.postEliminarProductoCarrito = async (req, res) => {
    try{
        const carrito = await Venta.findOne({
            usuario: req.body.usuario,
            estado: 'pendiente'
        });
        if(!carrito){
            return res.status(404).send({message: 'Carrito vacío'});
        }
        const productos = carrito.productos.filter(producto => !req.body.productos.includes(producto._id.toString()));
        let precioTotalSinImpuestoAdmin = 0;
        let precioTotalConImpuestoAdmin = 0;
        productos.forEach(producto => {
            precioTotalSinImpuestoAdmin += producto.precioSinImpuestoAdmin;
            precioTotalConImpuestoAdmin += producto.precioConImpuestoAdmin;
        });
        carrito.productos = productos;
        carrito.precioTotalSinImpuestoAdmin = precioTotalSinImpuestoAdmin;
        carrito.precioTotalConImpuestoAdmin = precioTotalConImpuestoAdmin;
        await carrito.save();
        res.status(200).send({message: 'Producto eliminado del carrito'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.deleteEliminarTarjeta = async (req, res) => {
    try{
        await Tarjeta.findByIdAndDelete(req.body.tarjeta);
        res.status(200).send({message: 'Tarjeta eliminada'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.postAgregarCarrito = async (req, res) => {
    try{
        const producto = await Producto.findById(req.body.producto);
        
        if(!producto){
            return res.status(404).send({message: 'Producto no encontrado'});
        }
        const cantidad= parseInt(req.body.cantidad);
        const precioSinImpuesto = producto.precioBruto * cantidad;
        const precioSinImpuestoAdmin = getPriceWithoutAdminTax(precioSinImpuesto, producto.impuesto);
        const precioConImpuestoAdmin = await getTotalPrice(precioSinImpuesto, producto.impuesto)
        const dataToAdd = {
            producto: producto,
            tramo: producto.tramo,
            cantidad: cantidad,
            precioSinImpuestoAdmin: precioSinImpuestoAdmin,
            precioConImpuestoAdmin: precioConImpuestoAdmin
        }
        let openRequest = await Venta.findOne({
            usuario: req.body.usuario,
            estado: 'pendiente'
        })
        if(!openRequest){
            openRequest = new Venta({
                usuario: req.body.usuario,
                estado: 'pendiente',
                productos: [dataToAdd],
                precioTotalSinImpuestoAdmin: dataToAdd.precioSinImpuestoAdmin,
                precioTotalConImpuestoAdmin: dataToAdd.precioConImpuestoAdmin
            });
            openRequest = await openRequest.save();
        }
        else{
            openRequest.precioTotalSinImpuestoAdmin += dataToAdd.precioSinImpuestoAdmin;
            openRequest.precioTotalConImpuestoAdmin += dataToAdd.precioConImpuestoAdmin;
            openRequest.productos.push(dataToAdd);
            openRequest = await openRequest.save();
        }
        res.status(200).send({message: 'Producto agregado al carrito'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

function getPriceWithoutAdminTax(brutePrice, productTax){
    return brutePrice + (brutePrice * productTax / 100);
}

exports.postObtenerTarjetas = async (req, res) => {
    try{
        const tarjetas = await Tarjeta.find({
            usuario: req.body.usuario
        });
        res.status(200).send({message: 'Tarjetas encontradas', tarjetas: tarjetas});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }

}

exports.postRealizarCompra = async (req, res) => {
    try{
        const carrito = await Venta.findOne({
            usuario: req.body.usuario,
            estado: 'pendiente'
        });
        if(!carrito){
            return res.status(404).send({message: 'Carrito vacío'});
        }
        carrito.estado = 'completado';
        carrito.fecha = new Date();
        carrito.tarjeta = req.body.tarjeta;
        await carrito.save();
        res.status(200).send({message: 'Compra realizada'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

//sales report manager controller
exports.getReportSalesAdmin = (req, res) => {
    const fileName = 'reporteVentasAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}


exports.getMisCompras = (req, res) => {
    const fileName = 'misCompras.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.postObtenerCompras = async (req, res) => {
    try{
        const fechaInicio = new Date(req.body.fechaInicio);
        const fechaFin = new Date(req.body.fechaFin);
        const compras = await Venta.find({
            usuario: req.body.usuario,
            estado: 'completado',
            fecha: {
                $gte: new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()),
                $lte: new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate()+1)
            }
        }).populate('productos.producto productos.tramo productos.resena');
        res.status(200).send({message: 'Compras encontradas', compras: compras});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

async function getTotalPrice(precioBruto, impuestoVendedor){
    const impuestoAdmin = await ImpuestoAdmin.findOne();
    return precioBruto + (precioBruto * (impuestoAdmin.impuesto + impuestoVendedor) / 100);
}

exports.getMisVentas = (req, res) => {
    const fileName = 'misVentas.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getVentas = async (req, res) => {
    try{
        const tramo =  await Tramo.findOne({usuario: req.body.usuario});
        const fechaInicio = new Date(req.body.fechaInicio);
        const fechaFin = new Date(req.body.fechaFin);
        const ventas = await Venta.find({
            estado: 'completado',
            fecha: {
                $gte: new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()),
                $lte: new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate()+1)
            },
            productos: {
                $elemMatch: {
                    tramo: tramo._id
                }
            }
        }).populate('productos.producto productos.tramo productos.resena usuario');
        res.status(200).send({message: 'Ventas encontradas', ventas: ventas, tramo: tramo._id});
    }catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.getAllSales = async (req, res) => {
    try{
        const fechaInicio = new Date(req.body.fechaInicio);
        const fechaFin = new Date(req.body.fechaFin);
        const ventas = await Venta.find({
            estado: 'completado',
            fecha: {
                $gte: new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()),
                $lte: new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate()+1)
            },
            usuario: req.body.idCliente !== "" ? req.body.idCliente : {$ne: null},
            'productos.tramo': req.body.idTramo !== "" ? req.body.idTramo : {$ne: null},
            'productos.producto': req.body.idProducto !== "" ? req.body.idProducto : {$ne: null}
        }).populate('productos.producto productos.tramo usuario');
        
       
        res.status(200).send({message: 'Compras encontradas', ventas: ventas});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}