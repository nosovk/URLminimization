import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './src/routers/index';
import dotenv from 'dotenv';
import cors from '@koa/cors';
import ngrok from 'ngrok';

dotenv.config();

const app = new koa();

app.use(cors());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT, async () => {
    const ngLink = await ngrok.connect(process.env.PORT);
    console.log(`link is available on ${ngLink}`);
});






