const userController = require('../controllers/userConroller');
const Router = require('koa-router');
const router = new Router();

router
    .post('/register', userController.registerPost)
    .post('/login', userController.loginPost)
    .post('/token', userController.token);

module.exports = router.routes();
