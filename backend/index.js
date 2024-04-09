const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const path = require('path');


// Routes
const adminRoutes = require('./routes/admin.js');
// const clientRoutes = require('./routes/client.js');
// const vendorRoutes = require('./routes/vendor.js');
const guestRoutes = require('./routes/guest.js');


// Importar modelos
// const modeloUsuario = require("./models/users");

const app = express();

app.use(cors());

app.use(express.static('public'))

// mongoose.connect(
//   "mongodb+srv://lcascante:cXe8bvl9pDpvWyeo@cluster0.isjhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

const port = 3000;


app.use('/admin', adminRoutes);
// app.use('/vendedor', vendorRoutes);
// app.use('/cliente', clientRoutes);
app.use('/', guestRoutes);




// app.get("/usuarios/:id", function (req, res) {
//   const id = req.params.id;

//   const usuario = usuarios.find(function (usuario) {
//     return usuario.id == id;
//   });

//   res.send(usuario);
// });

app.listen(port, function () {
  console.log("El servidor está escuchando en el puerto", port);
});
