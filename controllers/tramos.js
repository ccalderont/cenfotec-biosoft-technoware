const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

const Tramo = require('../models/tramo');

//tramo report admin controller
exports.getReportTramosAdmin = (req, res) => {
    const fileName = 'reporteTramosAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getAllTramos = async (req, res) => {
    try{
        let tramos = null;
            tramos = await Tramo.find({usuario:req.body.idUsuario !== '' ? req.body.idUsuario: {$ne: null} }).populate('usuario');

        res.status(200).send(tramos);
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}