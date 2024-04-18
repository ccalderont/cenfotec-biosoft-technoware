const express = require("express");
const router = express.Router();
const tarjetaController = require('../controllers/tarjeta.js');
const ventasController = require('../controllers/ventas.js');




// Home page route.
router.get("/registroTarjeta", tarjetaController.getRegistroTarjeta);
router.get("/carrito", ventasController.getCarrito);


module.exports = router;