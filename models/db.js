const { Client } = require('pg');

const client = new Client({
    user: 'alex__filatov',
    host: 'localhost',
    database: 'url'
});

client.connect();

module.exports = client;
