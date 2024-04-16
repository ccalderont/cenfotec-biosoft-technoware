const express = require("express");
const router = express.Router();
const generalController = require('../controllers/general.js');
const userController = require('../controllers/user.js');


router.get('/restaurarContrasena', userController.getRestaurarContrasena);

// Login page route.
router.get('/login', userController.getLogin);


module.exports = router;