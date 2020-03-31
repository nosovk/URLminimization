const urlController = require('../controllers/urlController');
const Router = require('koa-router');
const router = new Router();
const auth = require('../verifyToken');

router.get('/', auth, urlController.main)
    .post('/api/url/shorten', urlController.createShortLink)
    .get('/:code', urlController.redirectByCode);

module.exports = router.routes();
