
const express = require("express");
const router = express.Router();
const generalController = require('../controllers/general.js');
const userController = require('../controllers/user.js');
const tarjetaController = require('../controllers/tarjeta.js');
const ventasController = require('../controllers/ventas.js');


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

// Home page route.
router.get("/misCompras", ventasController.getMisCompras);


module.exports = router;