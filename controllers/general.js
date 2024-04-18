const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

exports.getIndex = (req, res) => {
    const fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getCatalogue = (req, res) => {
    const fileName = 'catalogo.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

//Sobre Nosotros CNP
exports.getAboutUsCNP = (req, res) => {
    const fileName = 'SobreNosotros.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

//Sobre Nosotros Technoware
exports.getAboutUsTech = (req, res) => {
    const fileName = 'sobreNosotrosTechnoware.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}