const path = require("path");

const options = {
  root: path.join(__dirname, "../views"),
};

const Usuario = require("../models/usuario");
const Tramo = require("../models/tramo");

exports.getLogin = (req, res) => {
  const fileName = "formularioLogin.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

/**
 * Retrieve the administrator´s profile
 *
 * @param {*} req
 * @param {*} res view of the administrator´s profile
 */
exports.getAdminProfile = (req, res) => {
  const fileName = "UserProfile.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

/**
 * Retrieve the vendor´s profile
 *
 * @param {*} req
 * @param {*} res view of the venfor´s profile
 */
exports.getVendorProfile = (req, res) => {
  const fileName = "UserProfile.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

exports.getReportUserAdmin = (req, res) => {
  const fileName = "reporteProductosAdmin.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

/**
 * Retrieve the client's profile
 *
 * @param {*} req
 * @param {*} res view of the client's profile
 */
exports.getClientProfile = (req, res) => {
  const fileName = "UserProfile.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

exports.getRestaurarContrasena = (req, res) => {
  const fileName = "contrasenarest.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

exports.getRegistroCliente = (req, res) => {
  const fileName = "RegistroCliente.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

//Nuevo Mongo Cliente
exports.postRegistroCliente = async (req, res) => {
  try {
    const newUsuario = new Usuario({
      foto: req.body.foto,
      tipoIdent: req.body.tipoId,
      cedula: req.body.numeroId,
      nombre: req.body.nombre,
      apellidos: req.body.apellido,
      telefono: req.body.telefono,
      email: req.body.correo,
      password: req.body.contrasena,
      tipoUsuario: "cliente",
      estado: "activo",
    });

    //Guardar el usuario en la BD
    await newUsuario.save();
    res.status(200).send({ message: "Usuario agregado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

//

//Registro Vendedor
exports.getRegistroVendedor = (req, res) => {
  const fileName = "RegistroVendedor.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};

//Nuevo Mongo Vendedor
exports.postRegistroVendedor = async (req, res) => {
  try {
    let newVendedor = new Usuario({
      foto: req.body.foto,
      tipoIdent: req.body.tipoId,
      cedula: req.body.numeroId,
      nombre: req.body.nombre,
      apellidos: req.body.apellido,
      telefono: req.body.telefono,
      email: req.body.correo,
      permisos: req.body.permisos,
      tipoUsuario: "Vendedor",
      estado: "pendiente",
    });

    //Guardar el usuario en la BD
    newVendedor = await newVendedor.save();

    let newTramo = new Tramo({
      nombre: req.body.tramo,
      estado: "pendiente",
      calificacion: 0,
      descripcion: req.body.descripcion,
      direccion: req.body.ubicacion,
      usuario: newVendedor,
    });

    newTramo = await newTramo.save();

    newVendedor.tramo = newTramo;

    newVendedor = await newVendedor.save();

    res
      .status(200)
      .send({ message: "Solicitud de vendedor enviada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

//

exports.getResetPassword = (req, res) => {
  const fileName = "restablecercont.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
};
