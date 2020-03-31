const koa = require('koa');
const serve = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const router = require('./src/routers/index');
const dotenv = require('dotenv');

dotenv.config();

const app = new koa();


app.use(bodyParser());
app.use(serve('./public'));
app.use(views('./views', {extension: 'pug'}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);






