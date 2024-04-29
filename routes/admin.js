const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin.js');


const productsController = require('../controllers/products.js');
const tramosController = require('../controllers/tramos.js');
const userController = require('../controllers/user.js');
const ventasController = require('../controllers/ventas.js');



// Home page route.
router.get("/impuestoAdmin", adminController.getImpuestoAdmin);
router.post("/updateImpuestoAdmin", adminController.updateImpuestoAdmin);

//product report manager route
router.get("/reporteProductos", productsController.getReportProductsAdmin);

//Tramo report manager route
router.get("/reporteTramos", tramosController.getReportTramosAdmin);

//User report manager route
router.get("/reporteUsuarios", userController.getReportUserAdmin);
router.post("/getAllUsers", userController.getAllUsers);
router.post("/cambiarEstadoUsuario", userController.changeStatus);

//Sales report manager route
router.get("/reporteVentas", ventasController.getReportSalesAdmin);

/**
 * Set the route for the administrator´s profile
 */
router.get("/perfilAdministrador", userController.getAdminProfile);

router.get("/solicitudesPendientes", adminController.getPendingRequests);
router.get("/getTramosPendientes", tramosController.getPendingTramos);
router.post("/aprobarTramo", tramosController.postApproveTramo);
router.get("/getProductosPendientes", productsController.getPendingProducts);
router.post("/aprobarProducto", productsController.postApproveProduct);

router.get("/registrarCategoria", adminController.getRegistrarCategoria);
router.get("/getAllCategorias", adminController.getAllCategorias);
router.post("/saveCategories", adminController.saveCategories);

router.get("/getAllClients", userController.getAllClients);
router.get("/getAllVendors", userController.getAllVendors);
router.get("/getAllProducts", productsController.getAllProducts);
router.get("/getAllStores", tramosController.getAllStores);
router.post("/getAllSales", ventasController.getAllSales);

module.exports = router;