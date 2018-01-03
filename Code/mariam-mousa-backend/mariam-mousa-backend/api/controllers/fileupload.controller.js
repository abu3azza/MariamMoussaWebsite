var multer = require('multer');


module.exports.upload = function(req, res) {


    console.log("bedayet el upload");
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function(req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function(req, file, cb) {
            console.log("File :" + JSON.stringify(file));
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    });
    console.log("da el var storage " + storage);

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');
    console.log("da el var upload  " + upload);
    upload(req, res, function(err) {
        if (err) {

            console.log("7asal error : " + err);
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    })
};