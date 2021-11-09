const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: function(req, file, cb) {
        cb("", file.originalname);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;