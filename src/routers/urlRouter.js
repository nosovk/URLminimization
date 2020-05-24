import {main, createShortLink, redirectByCode} from '../controllers/urlController';
import Router from 'koa-router';
import {auth} from '../verifyToken';
const router = new Router();

router
    .get('/', auth, main)
    .post('/api/url/shorten', createShortLink)
    .get('/:code', redirectByCode);

export default router.routes();
