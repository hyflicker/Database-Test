const express = require('express');
const Datastore = require('nedb')
const { request } = require('http');
const { response } = require('express');
const { time } = require('console');
const app = express();
app.listen(3000, () =>  console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const attendingdatabase = new Datastore('database.db');
attendingdatabase.loadDatabase();

app.get('/api', (request, response) => {
    attendingdatabase.find({},(err, data) => {
        if (err) {
            response.end();
            return;
        }
    response.json(data);
    });
});

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    attendingdatabase.insert(data);
    response.json({
        status: 'successs',
    });
});
