import koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import router from './src/routers/index';
import dotenv from 'dotenv';
import cors from '@koa/cors';
dotenv.config();

const app = new koa();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

// if (process.env.NODE_ENV === 'production'){
//     app.use(serve('frontend/build'));
//
//     // app.get('*', ctx => {
//     //     ctx.response.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     // })
// }

app.listen(PORT, async () => {

});









