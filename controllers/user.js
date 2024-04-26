const path = require('path');
const options = {
    root: path.join(__dirname, '../views')
};

const User = require('../models/usuario');

exports.getLogin = (req, res) => {

    const fileName = 'formularioLogin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.postLogin = async (req, res) => {
    const cedula = req.body.loginName;
    const password = req.body.password;

    try{
        const user = await User.findOne({ 
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


/**
 * Retrieve the administrator´s profile
 * 
 * @param {*} req 
 * @param {*} res view of the administrator´s profile
 */
exports.getAdminProfile = (req, res) => {
    const fileName = 'UserProfile.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
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
  const fileName = 'UserProfile.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}


exports.getReportUserAdmin = (req, res) => {

    const fileName = 'reporteProductosAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

/**
 * Retrieve the client's profile
 * 
 * @param {*} req 
 * @param {*} res view of the client's profile
 */
exports.getClientProfile = (req, res) => {
    const fileName = 'UserProfile.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });

}

exports.getRestaurarContrasena = (req, res) => {
    const fileName = 'contrasenarest.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getRegistroCliente = (req, res) => {
    const fileName = 'RegistroCliente.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}


//Registro Vendedor
exports.getRegistroVendedor = (req, res) => {
    const fileName = 'RegistroVendedor.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getResetPassword = (req, res) => {
    const fileName = 'restablecercont.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}