const client = require('../../models/db');
const argon2 = require('argon2');
const {registerSchema, loginSchema} = require('../validation');
const jwt = require('jsonwebtoken');

exports.registerGet = async(ctx) => {
    await ctx.render('register');
};

exports.registerPost = async(ctx) => {
    //Validate a data before we a user
    const {error} = registerSchema.validate(ctx.request.body);
    if (error) return await ctx.render('register', {error : error.message});

    //Checking if the user is already in the database
    const emailExist = await client.query("SELECT * FROM users WHERE email='"+ctx.request.body.email+"'");
    if (emailExist.rows[0]) return await ctx.render('register', {error : 'Email is already exist'});

    //Hash password
    const hash = await argon2.hash(ctx.request.body.password);

    //Create a new user
    await client.query("INSERT INTO users (email, password) VALUES ('"+ctx.request.body.email+"', '"+hash+"')");
    try {
        //const user = await client.query("SELECT * FROM users WHERE email='"+ctx.request.body.email+"'");
        ctx.redirect('/login');

    } catch (err) {
        ctx.throw(400, err);
    }
};


exports.loginGet = async(ctx) => {
    await ctx.render('login');
};

exports.loginPost = async(ctx) => {
    //Validate a data before we a user
    const {error} = loginSchema.validate(ctx.request.body);
    if (error) return await ctx.render('login', {error : error.message});

    //Checking if the email exists
    const user = await client.query("SELECT * FROM users WHERE email='"+ctx.request.body.email+"'");
    if (!user.rows[0]) return await ctx.render('login', {error : 'Email is not found'});

    //Password is correct
    const validPass = await argon2.verify(user.rows[0].password, ctx.request.body.password);
    if(!validPass) return await ctx.render('login', {error : 'Invalid password'});

    const token = jwt.sign({_id: user.rows[0].id, email:user.rows[0].email}, process.env.TOKEN_SECRET, {expiresIn:'1h'});
    ctx.set('auth-token', token);
    ctx.response.body = token;
    console.log(token);

    ctx.cookies.set('auth-token', token);

    ctx.redirect('/');
};
