const client = require('../../models/db');
const argon2 = require('argon2');
const {registerSchema, loginSchema} = require('../validation');
const jwt = require('jsonwebtoken');


exports.registerPost = async(ctx) => {
    //Validate a data before we a user
    const {error} = registerSchema.validate(ctx.request.body);
    if (error) return ctx.body = {error : error.message};

    //Checking if the user is already in the database
    const emailExist = await client.query("SELECT * FROM users WHERE email = $1", [ctx.request.body.email]);
    if (emailExist.rows[0]) return ctx.body = {error : 'Email is already exist'};

    //Hash password
    const hash = await argon2.hash(ctx.request.body.password);

    //Create a new user
    await client.query("INSERT INTO users (email, password) VALUES ($1, $2)", [ctx.request.body.email, hash]);
    try {
        //const user = await client.query("SELECT * FROM users WHERE email = $1", [ctx.request.body.email]);
        //console.log(user.rows[0].id);
        ctx.body = {user: true};
    } catch (err) {
        ctx.throw(400, err);
    }
};


exports.loginPost = async(ctx) => {
    //Validate a data before we a user
    const {error} = loginSchema.validate(ctx.request.body);
    if (error) return ctx.body = {error : error.message};

    //Checking if the email exists
    const user = await client.query("SELECT * FROM users WHERE email = $1", [ctx.request.body.email]);
    if (!user.rows[0]) return ctx.body = {error : 'Email is not found'};

    //Password is correct
    const validPass = await argon2.verify(user.rows[0].password, ctx.request.body.password);
    if(!validPass) return ctx.body = {error : 'Invalid password'};

    //console.log(user.rows[0].email);
    const accessToken = generateAccessToken({email: user.rows[0].email});
    // eslint-disable-next-line no-undef
    const refreshToken = jwt.sign(user.rows[0].email, process.env.REFRESH_TOKEN_SECRET);
    await client.query("INSERT INTO tokens (rtoken) VALUES ($1)", [refreshToken]);
    ctx.body = {user: true, accessToken: accessToken, refreshToken: refreshToken};
};

exports.token = async(ctx) => {
    const refreshToken = ctx.request.body.token;
    if (refreshToken == null) return ctx.throw(401);

    const refreshTokens = await client.query("SELECT * FROM tokens WHERE rtoken = $1", [refreshToken]);
    if (!refreshTokens.rows[0]) return ctx.throw(403);
    // eslint-disable-next-line no-undef
    const verify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = generateAccessToken({ email: verify });
    ctx.body = { accessToken: accessToken, refreshToken: refreshToken};
};

function generateAccessToken(user) {
    // eslint-disable-next-line no-undef
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
