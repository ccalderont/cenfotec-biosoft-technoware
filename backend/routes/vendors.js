const express = require("express");
const router = express.Router();
const productsController = require('../controllers/products.js');

router.get("/registrarProducto", productsController.getRegistrarProducto);
module.exports = router;