const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.js');


// Registro Cliente
router.get("/registroCliente", userController.getRegistroCliente);


module.exports = router;