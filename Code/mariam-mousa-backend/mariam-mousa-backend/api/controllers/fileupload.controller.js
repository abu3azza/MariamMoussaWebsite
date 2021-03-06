var multer = require('multer');
const fs = require('fs');



module.exports.upload = function (req, res) {

    var filename;
    console.log("bedayet el upload");
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
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
    upload(req, res, function (err) {
        if (err) {

            console.log("7asal error : " + err);
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        console.log("da el file name" + filename);
        res.json({ error_code: 0, err_desc: null, imgname: filename });
    })
};
module.exports.deleteImageByPath = function (path) {
    fs.unlink('./uploads/' + path, (err) => {
        if (err) {
            console.log("failed to delete image : " + path);
            console.log("error=>" + err);
            return;
        } else {
            console.log("Image deleted succssfully");
        }
    })
};

module.exports.deleteImage = function (req, res) {
    var name = req.query.name;

    console.log('deleting Image : ' + name);
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


module.exports.uploadBrochure = function(req, res) {

    var filename;
    console.log("bedayet el upload");
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function(req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function(req, file, cb) {
            console.log("File :" + JSON.stringify(file));
            filename = 'Brochure.pdf'
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
module.exports.deleteBrochure = function(req, res) {


    fs.unlink('./uploads/' + 'Brochure.pdf', (err) => {
        if (err) {
            console.log("7asal error : " + err);
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        console.log('successfully deleted ');
        res.json({ error_code: 0, err_desc: 'deleted succesfully' });

    });
};