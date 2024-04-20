const express = require("express");
const router = express.Router();
const generalController = require('../controllers/general.js');
const userController = require('../controllers/user.js');


// Home page route.
router.get("/", generalController.getIndex);

// Login page route.
router.get('/login', userController.getLogin);

router.get('/catalogo', generalController.getCatalogue);

router.get('/sobreNosotros', generalController.getAboutUsCNP);

router.get('/sobreNosotrosTech', generalController.getAboutUsTech);

router.get('/restablecerContrasena', userController.getResetPassword);

router.get('/restaurarContrasena', userController.getRestaurarContrasena);

router.get('/registroCliente', userController.getRegistroCliente);

router.get('/registroVendedor', userController.getRegistroVendedor);


module.exports = router;