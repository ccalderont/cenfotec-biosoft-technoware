const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin.js');


// Home page route.
router.get("/impuestoAdmin", adminController.getImpuestoAdmin);

//Registrar Categoría
router.get("/registrarCategoria", adminController.getRegistrarCategoria);


module.exports = router;