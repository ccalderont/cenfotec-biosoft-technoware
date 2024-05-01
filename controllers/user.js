
const path = require('path');
const options = {
  root: path.join(__dirname, "../views"),
};
const Usuario= require("../models/usuario");
const Tramo = require("../models/tramo");
const mailController = require('./mail');


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





exports.postLogin = async (req, res) => {
    const cedula = req.body.loginName;
    const password = req.body.password;

    try{
        const user = await Usuario.findOne({ 
            cedula: cedula,
            password: password,
            estado: 'activo'
        });
        if(!user){
            res.status(401).send({message: 'Usuario no encontrado'});
            return;
        }
        res.status(200).send({
            message: 'Usuario encontrado',
            id: user.id,
            cedula: user.cedula,
            nombre: user.nombre,
            apellido: user.apellidos,
            email: user.email,
            telefono: user.telefono,
            tipoUsuario: user.tipoUsuario,
            foto: user.foto
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
    

}

exports.postLogin = async (req, res) => {
    const cedula = req.body.loginName;
    const password = req.body.password;

    try{
        const user = await Usuario.findOne({ 
            cedula: cedula,
            password: password,
            estado: 'activo'
        });
        if(!user){
            res.status(401).send({message: 'Usuario no encontrado'});
            return;
        }
        res.status(200).send({
            message: 'Usuario encontrado',
            id: user.id,
            cedula: user.cedula,
            nombre: user.nombre,
            apellido: user.apellidos,
            email: user.email,
            telefono: user.telefono,
            tipoUsuario: user.tipoUsuario,
            foto: user.foto
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
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
    const fileName = 'reporteUsuariosAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}


exports.getAllUsers = async (req, res) => {
    try{
        const users = await Usuario.find({
            estado: req.body.estado !== '' ? req.body.estado : {$ne: "pendiente"},
            tipoUsuario: req.body.tipoUsuario !== '' ? req.body.tipoUsuario : {$ne: null}
        }).populate('tramo').sort({nombre: 1});
        res.status(200).send({users: users});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.changeUserStatus = async (req, res) => {
    try{
        const user = await Usuario.findById(req.body.idUsuario).populate('tramo');
        user.estado = user.estado === 'activo' ? 'inactivo' : 'activo';
        await user.save();
        if(user.estado === 'inactivo'){
            if(user.tramo){
                user.tramo.estado = 'inactivo';
                await user.tramo.save();
            }
        }

        //send email to the user
        mailController.sendUserStatusChangeEmail(user, req.body.razon);
        res.status(200).send({message: 'Estado actualizado'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

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


/**
 * Retrieve the user´s info.
 * According to the id obtained from <code>localstore.getitem(idUsuario)</code> the info for the user is retrieved.
 * 
 * @param {*} req 
 * @param {*} res 
 * @see postLogin
 * @see routes/admin.js
 * @see public/js/formularioLogin.js
 */
exports.getUserData = async (req, res) =>{
    let user = null
    try {
        const id = req.params.id;
        user = await Usuario.findById(id).populate(`tramo`);

        if(!user.foto){
            user.foto = "../resources/images/home/lupa.png";
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        console.log("Usuario no encontrado");
    }
};

/**
 * Update the user's info.
 * First validate the body and confirm it includes data to be udpated <code>if(!req.body)</code>. Then it takes the id and tramoID from the body. For all users it updates the common fields in <code>Usuario.findByIdAndUpdate</code>. If the user is a vendor it updates the fields for vendor in <code>if(tramoID)</code> 
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @see public/js/UserProfile.js 
 */
exports.putUserData = async(req, res) =>{

    if(!req.body){
        console.log("No se envió el cuerpo del correo");
        res.status(400).send("Falta el cuerpo de la solicitud");
      }
      
    try {
        const {id, tramoID} = req.body;
        let userUpdated = null; 

        userUpdated = await Usuario.findByIdAndUpdate(id, req.body, {new: true}).populate("tramo");

        if(!userUpdated){
            console.log("Usuario no encontrado");
            return res.status(400).send("Usuario no encontrado")
        };

        if(tramoID){
            userUpdated.tramo.nombre = req.body.tramoNombre;
            userUpdated.tramo.direccion = req.body.tramoDireccion;
    
            userUpdated = await userUpdated.tramo.save();
        }

        console.log(`Usuario ${userUpdated.id} actualizado.`);
        res.status(200).send(userUpdated);
    } catch (error) {
        console.error(error);
        res.status(501).send("Hubo un error. No se pueden actualizar los datos");
    }
};

exports.postCambiarPassword = async (req, res) => {
    const userId = req.body.userId;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    try{
        const user = await Usuario.findById(userId);
        if(user.password !== oldPassword){
            res.status(401).send({message: 'Contraseña incorrecta'});
            return;
        }
        user.password = newPassword;
        await user.save();
        res.status(200).send({message: 'Contraseña actualizada'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.postEnviarCorreoPassword = async (req, res) => {
    const cedula = req.body.identificacion;
    try{
        const user = await Usuario.findOne({cedula: cedula});
        if(!user){
            res.status(401).send({message: 'Usuario no encontrado'});
            return;
        }
        //send email to the user
        switch(user.estado){
            case 'activo':
                const newPassword = await changeUserPassword(user);
                mailController.sendPasswordResetEmail(user, newPassword);
                break;
            case 'inactivo':
                mailController.sendInactiveUserEmail(user);
                break;
            case 'pendiente':
                mailController.sendPendingUserEmail(user);
                break;
        }
        res.status(200).send({message: 'Correo enviado'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}

async function changeUserPassword(user){
    const newPassword = Math.random().toString(36).slice(-8);
    user.password = newPassword;
    await user.save();
    return newPassword;
}

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
      tipoUsuario: "vendedor",
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



exports.getAllClients = async (req, res) => {
    try{
        const clients = await Usuario.find({tipoUsuario: 'cliente'});
        res.status(200).send({clients: clients});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }

}

exports.getAllVendors = async (req, res) => {
    try{
        const vendors = await Usuario.find({tipoUsuario: 'vendedor'});
        res.status(200).send({vendors: vendors});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }

}

