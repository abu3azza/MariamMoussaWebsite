var multer = require('multer');
const fs = require('fs');



module.exports.upload = function(req, res) {

    var filename;
    console.log("bedayet el upload");
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function(req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function(req, file, cb) {
            console.log("File :" + JSON.stringify(file));
            var datetimestamp = Date.now();
            filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
            cb(null, filename)
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
        console.log("da el file name" + filename);
        res.json({ error_code: 0, err_desc: null, imgname: filename });
    })
};

module.exports.deleteImage = function(req, res) {
    var name = req.query.name;

    console.log('imageName = ' + name);
    fs.unlink('./uploads/' + name, (err) => {
        if (err) {
            console.log("7asal error : " + err);
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        console.log('successfully deleted ./uploads/' + name);
        res.json({ error_code: 0, err_desc: 'deleted succesfully', imgname: name });

    });
};