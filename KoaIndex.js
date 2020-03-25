const koa = require('koa');
const koaRouter = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');
const { Client } = require('pg');
let request = require("request");
const bodyParser = require('koa-bodyparser');
const argon2 = require('argon2');


const app = new koa();
const router = new koaRouter();

app.use(bodyParser());
app.use(serve('./public'));
app.use(views('./views', {extension: 'pug'}));


const client = new Client({
    user: 'alex__filatov',
    host: 'localhost',
    database: 'url'
});

client.connect();

async function myFun(originalName){
    let linkRequest = {
        destination: originalName,
        domain: { fullName: "rebrand.ly" }
    };

    let requestHeaders = {
        "Content-Type": "application/json",
        "apikey": "2888135679434ff69b4b5b1d7f9bd52b"
    };

    request({
        uri: "https://api.rebrandly.com/v1/links",
        method: "POST",
        body: JSON.stringify(linkRequest),
        headers: requestHeaders
    },  (err, response, body) => {
        let link =  JSON.parse(body);
        console.log(`Long URL was ${link.destination}, short URL is ${link.shortUrl}`);

        let sql = "INSERT INTO urlinfo (originalname, shortname) VALUES ('"+link.destination+"', '"+link.shortUrl+"')";
        client.query(sql,function (err) {
            if (err) throw err;
        });

    });
}


router.get('/',  async (ctx) => {
     await ctx.render('index');
});

router.post('/api',  async (ctx) => {

    await myFun(ctx.request.body.OriginalName);

    const res = await client.query('SELECT * FROM urlinfo order by ID DESC limit 1 ');

    await ctx.render('dev', {
        shortName: res.rows[0].shortname,
        originalName: res.rows[0].originalname
    });
});

router.get('/register', async (ctx) => {
    await ctx.render('register');
});

router.post('/register', async (ctx) => {
    try {
        const hash = await argon2.hash(ctx.request.body.password);
        await client.query("INSERT INTO users (email, password) VALUES ('"+ctx.request.body.email+"', '"+hash+"')");
        ctx.response.redirect('/');

    } catch (err) {
        ctx.response.json('Something wrong');
    }

});

router.get('/login', async (ctx) => {
    await ctx.render('login');
});

router.post('/login', async (ctx) => {
    const user = await client.query("SELECT * FROM users WHERE email='"+ctx.request.body.email+"'");
    console.log(ctx.request.body);

    try {
        if (await argon2.verify(user.rows[0].password, ctx.request.body.password)) {
            ctx.response.body = 'Correct password';
            //await ctx.render('index');
        } else {
            ctx.response.body = 'Password wrong';
        }
    } catch (err) {
        ctx.response.body = 'internal failure';
    }

});


app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
