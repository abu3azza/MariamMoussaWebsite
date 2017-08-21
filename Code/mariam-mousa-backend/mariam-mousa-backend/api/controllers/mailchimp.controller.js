var request = require('superagent');


module.exports.addUserToList = function(req, res) {
    var mailchimpInstance = 'us16',
        listUniqueId = 'f76a0f3e41',
        mailchimpApiKey = '8ccaa008ac2244c1861d5e0e6d68ccfb-us16';
    if (req.query && req.query.mail) {
        var mail = req.query.mail;
        console.log(mail);
        request
            .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
            .set('Content-Type', 'application/json;charset=utf-8')
            .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
            .send({
                'email_address': mail,
                'status': 'subscribed'
                    // 'merge_fields': {
                    //     'FNAME': req.body.firstName,
                    //     'LNAME': req.body.lastName
                    // }
            })
            .end(function(err, response) {
                if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                    res.send('Signed Up!');
                    console.log("nege7 wla eh");
                } else {
                    res.send('Sign Up Failed :(' + response.body.title);
                    console.log("mange7sh ya fa2r");
                }
            });
    } else {
        console.log("Data missing from url");
        res
            .status(400)
            .json({ message: "Required email missing from URL. " });
    }


};