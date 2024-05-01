const path = require('path');

const Tarjeta = require("../models/tarjeta.js");

const options = {
    root: path.join(__dirname, '../views')
};

exports.getRegistroTarjeta = (req, res) => {
    const fileName = 'registroTarjeta.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.postRegistroTarjeta = async (req, res) => {

    const newTarjeta = new Tarjeta({
        usuario: req.body.idUser,
        tarjetaHabiente: req.body.cardHolder,
        numeroTarjeta: req.body.cardNumber,
        mesExpiracion: req.body.monthExpiration,
        annoExpiracion: req.body.yearExpiration,
    });

    //Guardar el usuario en la BD
    await newTarjeta.save();
    res.status(201).send(newTarjeta);

}