
const express = require("express");
const router = express.Router();
const generalController = require('../controllers/general.js');
const userController = require('../controllers/user.js');
const productsController = require('../controllers/products.js');
const ventasController = require('../controllers/ventas.js');

// Home page route.
router.get("/", generalController.getIndex);

// Login page route.
router.get('/login', userController.getLogin);


/**
 * Set the route for the vendor´s profile
 */
router.get("/perfilVendedor", userController.getVendorProfile);

router.get("/misVentas", ventasController.getMisVentas);

router.get("/misProductos", productsController.getMisProductos);

router.get("/registrarProducto", productsController.getRegistrarProducto);


module.exports = router;