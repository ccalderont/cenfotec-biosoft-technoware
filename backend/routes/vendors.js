const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.js');


// Registro Vendedor
router.get("/registroVendedor", userController.getRegistroVendedor);


module.exports = router;