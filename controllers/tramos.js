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

exports.getActiveStores = async (req, res) => {
    try{
        const stores = await Tramo.find({estado: 'activo'});
        res.status(200).send({stores: stores});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
}