var mailer = require('nodemailer')
    , xoauth2 = require('xoauth2');
/*
var xoauth2gen = xoauth2.createXOAuth2Generator({
    user: 'aforward92@gmail.com',
    clientId: '263160526983-q1g63psr371qmfungp7nnvdpfb4bo7s5.apps.googleusercontent.com',
    clientSecret: 'row6BHTVcoskLnnhdPnVKMq8',
    refreshToken: '1/50XgL9Gyj-4EI4yk9peR4plbO6Tsi2RlDWyKvB8onOs',
    accessToken: 'ya29.CjHyAsqYSOQTuQwJ7eodobsdXhvoDapo0Vnyy_gEmvbMbHaTWIUR-fX7cWAXXPGJGZzK'

});*/
/*generator.on('token', function (token) {
    console.log('New Token %s: %s', token.user, token.accessToken);
})*/

require('dotenv').config();
var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: process.env.MAILER_USER,
            clientId:process.env.CLIENT_ID ,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
        })
    }
})

exports.SendEnq = function (req, res) {

    console.log(req.body.Name); 
    var mailOpts = {
        from: req.body.Name + '&lt;' + req.body.Email + '&gt;',
        to: "aforward92@gmail.com",
        subject: 'Website Enquiry ' + req.body.Name,
        text: 'Contact Number ' + req.body.Number + '\n'
                + 'Email: ' + req.body.Email + '\n'
                +  req.body.Message 
    };

    transporter.sendMail(mailOpts, function (error, reps) {
        if (error) {
            console.log(error);
            res.render('home', { title: 'BLMA - Enquiry',
                msg: 'Error occured message not sent.', err: true, page: 'enquire'
            });
        } else {
            res.render('TaiChi', { title: 'BLMA - Enquiry',
                msg: 'Message Sent! Thank You.', err: false, page: 'enquire'
            });
        }
    });
}