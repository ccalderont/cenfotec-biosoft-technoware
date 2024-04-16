const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin.js');
const userController = require("../controllers/user.js");

// Home page route.
router.get("/impuestoAdmin", adminController.getImpuestoAdmin);


/**
 * Set the route for the administrator´s profile
 */
router.get("/perfilAdministrador", userController.getAdminProfile);

module.exports = router;