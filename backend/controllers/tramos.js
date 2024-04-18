const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

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