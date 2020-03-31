const userController = require('../controllers/userConroller');
const Router = require('koa-router');
const router = new Router();

router.get('/register', userController.registerGet)
    .post('/register', userController.registerPost)
    .get('/login', userController.loginGet)
    .post('/login', userController.loginPost);

module.exports = router.routes();
