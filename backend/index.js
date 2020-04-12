const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./src/routers/index');
const dotenv = require('dotenv');
const cors = require('@koa/cors');

dotenv.config();

const app = new koa();

app.use(cors());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000);






