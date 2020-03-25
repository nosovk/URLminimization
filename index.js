


//IT'S EXPRESS APPLICATION, YOU SHOULD GO TO KoaIndex.js !!!






// const express = require('express');
// // var serve = require('koa-static');
// // const Koa = require('koa');
// // const app = new Koa();
// const path = require('path');
// const { Client } = require('pg');
// let request = require("request");
//
// const app = express();
// const PORT = 3000;
//
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'));
//
// // app.use(serve('./public'));
//
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// const client = new Client({
//     user: 'alex__filatov',
//     host: 'localhost',
//     database: 'url'
// });
//
// client.connect();
//
//
// app.get('/', function (req, res) {
//     res.render('index', {
//         myCase: req.rows
//     });
//
// });
//
// app.post('/api', (req, res) => {
//
//     let linkRequest = {
//         destination: req.body.OriginalName,
//         domain: { fullName: "rebrand.ly" }
//     };
//
//     let requestHeaders = {
//         "Content-Type": "application/json",
//         "apikey": "2888135679434ff69b4b5b1d7f9bd52b"
//     };
//
//     request({
//         uri: "https://api.rebrandly.com/v1/links",
//         method: "POST",
//         body: JSON.stringify(linkRequest),
//         headers: requestHeaders
//     }, (err, response, body) => {
//         let link = JSON.parse(body);
//         console.log(`Long URL was ${link.destination}, short URL is ${link.shortUrl}`);
//
//         let sql = "INSERT INTO urlinfo (originalname, shortname) VALUES ('"+link.destination+"', '"+link.shortUrl+"')";
//
//         client.query(sql, function (err, result) {
//             if (err) throw err;
//             res.send(link.shortUrl);
//         });
//     });
//
//     console.log(req.body);
//
//
// });
//
// app.listen(PORT);

