const path = require("path")
const multer = require("multer")

//photo Storage 
const photoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'))
    },
    filename: function (req, file, cb) {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        } else {
            cb(null, false)
        }
    }
})

//photo Upload Middleware