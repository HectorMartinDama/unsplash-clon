const multer= require('multer');
const path= require('path');
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      return callback(null, './uploads')
    },
    filename: function (req, file, callback) {
      return callback(null, `${uuidv4()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage })


module.exports = upload;