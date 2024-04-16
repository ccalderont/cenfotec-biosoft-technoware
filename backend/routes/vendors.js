const express = require("express");
const router = express.Router();
const generalController = require('../controllers/general.js');
const userController = require('../controllers/user.js');


// Home page route.
router.get("/", generalController.getIndex);

// Login page route.
router.get('/login', userController.getLogin);


/**
 * Set the route for the vendor´s profile
 */
router.get("/perfilVendedor", userController.getVendorProfile);

module.exports = router;