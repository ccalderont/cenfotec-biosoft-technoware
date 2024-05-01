const express = require("express");
const router = express.Router();
const generalController = require('../controllers/general.js');
const userController = require('../controllers/user.js');
const storeController = require('../controllers/tramos.js');
const productController = require('../controllers/products.js');


// Home page route.
router.get("/", generalController.getIndex);

// Login page routes
// Get login page
router.get('/login', userController.getLogin);
// Post login
router.post('/login', userController.postLogin);

router.get('/catalogo', generalController.getCatalogue);
router.get('/getActiveProducts', productController.getActiveProducts);
router.get('/getAllStores', storeController.getActiveStores);
router.get('/getActiveCategories', generalController.getActiveCategories);
router.post('/getProductsFiltered', productController.postProductsFiltered);



router.get('/sobreNosotros', generalController.getAboutUsCNP);

router.get('/sobreNosotrosTech', generalController.getAboutUsTech);

router.get('/restablecerContrasena', userController.getResetPassword);

router.get('/restaurarContrasena', userController.getRestaurarContrasena);

router.get('/registroCliente', userController.getRegistroCliente);

router.get('/registroVendedor', userController.getRegistroVendedor);

router.get('/getImpuestoAdmin', generalController.getImpuestoAdmin);




module.exports = router;