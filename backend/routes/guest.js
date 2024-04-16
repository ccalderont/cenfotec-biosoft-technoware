const express = require("express");
const router = express.Router();
const generalController = require('../controllers/general.js');
const userController = require('../controllers/user.js');


// Home page route.
router.get("/", generalController.getIndex);

// Login page route.
router.get('/login', userController.getLogin);

// Sobre Nosotros CNP
router.get('/sobreNosotros', generalController.getAboutUsCNP);

// Sobre Nosotros Technoware
router.get('/sobreNosotrosTech', generalController.getAboutUsTech);



module.exports = router;