require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');


// Routes
const adminRoutes = require('./routes/admin.js');
const clientRoutes = require('./routes/clients.js');
const vendorRoutes = require('./routes/vendors.js');
const guestRoutes = require('./routes/guest.js');


// Importar modelos
const modeloUsuario = require("./models/usuario.js");
const modeloProducto = require("./models/producto.js");
const modeloTramo = require("./models/tramo.js");
const modeloTarjeta = require("./models/tarjeta.js");
const modeloVenta = require("./models/venta.js");
const modeloResena = require("./models/resena.js");
const modeloCategoria = require("./models/categoria.js");
const modeloProvincia = require("./models/provincia.js");
const modeloCanton = require("./models/canton.js");
const modeloDistrito = require("./models/distrito.js");
const modeloImpuesto = require("./models/impuesto.js");


const app = express();

app.use(cors());

app.use(express.static('public'))

mongoose.connect(
  process.env.MONGO_URI
);


app.use('/admin', adminRoutes);
app.use('/vendedor', vendorRoutes);
app.use('/cliente', clientRoutes);
app.use('/', guestRoutes);


// app.get("/usuarios/:id", function (req, res) {
//   const id = req.params.id;

//   const usuario = usuarios.find(function (usuario) {
//     return usuario.id == id;
//   });

//   res.send(usuario);
// });

app.listen(process.env.PORT, function () {
  console.log("El servidor está escuchando en el puerto", process.env.PORT);
});
