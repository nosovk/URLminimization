const jwt = require('jsonwebtoken');
module.exports = async function (ctx, next) {
    //const token = ctx.get('auth-token');
    //console.log('cookie:'+ ctx.cookies.get('auth-token'));

    const token = ctx.cookies.get('auth-token');

    //console.log('token is:' + token);
    if(!token) return ctx.throw(400, 'access denied');
    try {
        ctx.request.user = jwt.verify(token, process.env.TOKEN_SECRET);
        return next()

    } catch (err) {
        ctx.throw(400, err);
    }
};
