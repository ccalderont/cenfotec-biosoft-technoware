
const express = require("express");
const router = express.Router();
const generalController = require('../controllers/general.js');
const userController = require('../controllers/user.js');
const tarjetaController = require('../controllers/tarjeta.js');
const ventasController = require('../controllers/ventas.js');
const resenasController = require('../controllers/resenas.js');


// Home page route.
router.get("/", generalController.getIndex);

// Login page route.
router.get('/login', userController.getLogin);

/**
 * Set the route for the client´s profile
 */
router.get("/perfilCliente", userController.getClientProfile);



// Home page route.
router.get("/registroTarjeta", tarjetaController.getRegistroTarjeta);

router.get("/carrito", ventasController.getCarrito);
router.post("/agregarCarrito", ventasController.postAgregarCarrito);
router.post("/obtenerCarrito", ventasController.postObtenerCarrito);
router.post("/obtenerTarjetas", ventasController.postObtenerTarjetas);
router.post("/realizarCompra", ventasController.postRealizarCompra);
router.post("/eliminarProductoCarrito", ventasController.postEliminarProductoCarrito);
router.delete("/eliminarTarjeta", ventasController.deleteEliminarTarjeta);

// Home page route.
router.get("/misCompras", ventasController.getMisCompras);
router.post("/obtenerCompras", ventasController.postObtenerCompras);
router.post("/agregarResena", resenasController.postAgregarResena);
router.delete("/eliminarResena", resenasController.deleteEliminarResena);


module.exports = router;