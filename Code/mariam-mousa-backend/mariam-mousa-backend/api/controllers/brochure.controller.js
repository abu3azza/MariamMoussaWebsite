module.exports.download = function(req, res) {
    console.log('downloading brochure');
    var file = __dirname + '/../data/Final.pdf';
    res.download(file); // Set disposition and send it.
};