const Router = require("koa-router");
const router = new Router();
const api = new Router();

const users = require("./userRouter");
const url = require("./urlRouter");

api.use(users);
api.use(url);

router.use(api.routes());

module.exports = router;
