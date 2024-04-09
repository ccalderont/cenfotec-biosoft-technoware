const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

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