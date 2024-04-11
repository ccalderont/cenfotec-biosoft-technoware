const express = require("express");
const router = express.Router();
const ventasController = require('../controllers/ventas.js');


// Home page route.
router.get("/misVentas", ventasController.getMisVentas);


module.exports = router;