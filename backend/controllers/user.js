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
};

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
};