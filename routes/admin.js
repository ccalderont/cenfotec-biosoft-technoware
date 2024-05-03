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
router.post("/getAllProductsFilterd", productsController.getAllProductsFilterd);
router.post("/cambiarEstadoProducto", productsController.changeProductStatus);
router.post("/cambiarEstadoTramo", tramosController.changeTramoStatus);

//Tramo report manager route
router.get("/reporteTramos", tramosController.getReportTramosAdmin);
router.post("/obtenerTramos",tramosController.getAllTramos);

//User report manager route
router.get("/reporteUsuarios", userController.getReportUserAdmin);
router.post("/getAllUsers", userController.getAllUsers);
router.post("/cambiarEstadoUsuario", userController.changeUserStatus);

//Sales report manager route
router.get("/reporteVentas", ventasController.getReportSalesAdmin);

/**
 * Set the route for the administrator´s profile
 */
router.get("/perfilAdministrador", userController.getAdminProfile);

/**
 * Set the route to get the current user's data
 */
router.get("/perfilAdministrador/:id", userController.getUserData);


/**
 * Set the route to update the user's data
 */
router.put("/perfilAdministrador", userController.putUserData);

router.get("/solicitudesPendientes", adminController.getPendingRequests);
router.get("/getTramosPendientes", tramosController.getPendingTramos);
router.post("/aprobarTramo", tramosController.postApproveTramo);
router.post("/rechazarTramo", tramosController.postRejectTramo);
router.get("/getProductosPendientes", productsController.getPendingProducts);
router.post("/aprobarProducto", productsController.postApproveProduct);
router.post("/rechazarProducto", productsController.postRejectProduct);


router.get("/registrarCategoria", adminController.getRegistrarCategoria);

router.get("/getAllCategorias", adminController.getAllCategorias);
router.post("/saveCategories", adminController.saveCategories);

router.get("/getAllClients", userController.getAllClients);
router.get("/getAllVendors", userController.getAllVendors);
router.get("/getAllProducts", productsController.getAllProducts);
router.get("/getAllStores", tramosController.getAllStores);
router.post("/getAllSales", ventasController.getAllSales);

module.exports = router;