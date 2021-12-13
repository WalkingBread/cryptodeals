const express = require('express');
const rp = require('request-promise');
const fs = require('fs');
const mailer = require('nodemailer');
const body_parser = require('body-parser');

const app = express();
app.use(express.static('website'))
app.use(body_parser());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/website/index.html');
});

app.get('/api', (req, res) => {
    const time = Date.now();

    fs.readFile(__dirname + '/res/lasttime.txt', 'utf8', (err, data) => {
        if (err) {
          return console.log(err);
        }

        const lasttime = data;


        if (time - lasttime >= 3600 * 1000) {

            console.log('update');

            const requestOptions = {
                method: 'GET',
                uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
                qs: {
                    'start': '1',
                    'limit': '5000',
                    'convert': 'USD'
                },
                headers: {
                    'X-CMC_PRO_API_KEY': 'aa902efd-e5bf-4005-8b97-6665dc8c8b54'
                },
                json: true,
                gzip: true
            };
        
            rp(requestOptions).then(response => {
                const data = JSON.stringify(response);

                res.send(data);
        
                fs.writeFile(__dirname + '/res/lasttime.txt', time, 'utf-8', null);
                fs.writeFile(__dirname + '/res/data.json', data, 'utf-8', null);
        
            }).catch((err) => {
                res.send(err.message);
            });
        } else {
            console.log('fetching from file');
            fs.readFile(__dirname + '/res/data.json', 'utf8', (err, data) => {
                if (err) {
                  return console.log(err);
                }

                res.send(data);
            });
        }
    });
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/website/contact.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/website/about.html');
});

app.post('/email', (req, res) => {
    console.log(req.body);
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cryptoassistant.com@gmail.com',
            pass: ''
        }
    });

    const mail_options = {
        from: 'cryptoassistant.com@gmail.com',
        to: 'cryptoassistant.com@gmail.com',
        subject: req.body.subject,
        text: 'email: ' + req.body.email + '\n' + 'name: ' + req.body.name + '\n' + 'text: ' + req.body.text
    };

    transporter.sendMail(mail_options, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.sendFile(__dirname + '/website/contact.html');
});

const server = app.listen(8080, () => {
    var port = server.address().port
    
    console.log("Listening at port: " + port);
});
