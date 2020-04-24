const express = require('express');
const rp = require('request-promise');
const fs = require('fs');

const app = express();
app.use(express.static('website'))


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

        if (time >= lasttime + 3600) {

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
            fs.readFile(__dirname + '/res/data.json', 'utf8', (err, data) => {
                if (err) {
                  return console.log(err);
                }

                res.send(data);
            });
        }
    });
});

const server = app.listen(8080, () => {
    var port = server.address().port
    
    console.log("Listening at port: " + port);
});