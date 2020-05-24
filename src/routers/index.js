const Router = require("koa-router");
const router = new Router();
const api = new Router();

import users from "./userRouter";
import url from "./urlRouter";

api.use(users);
api.use(url);

router.use(api.routes());

export default router;
