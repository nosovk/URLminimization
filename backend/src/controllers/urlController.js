const validUrl = require('valid-url');
const shortid = require('shortid');
const client = require('../../models/db');
const geoip = require('geoip-lite');
const publicIp = require('public-ip');

exports.main = async(ctx) => {
    //Gey unique elements from db
    const newLoc = await client.query("with maxcnt as (SELECT max(cnt) as cnt, urlcode  FROM location GROUP BY urlcode) select * from location natural join maxcnt order by cnt desc limit 5");

    await ctx.render('index', {
        myCase: newLoc.rows,
        user: ctx.request.user.email
    });
};


exports.createShortLink = async(ctx) => {
    const longUrl = ctx.request.body.OriginalName;
    const baseUrl = 'http://localhost:3000';
    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
        try {
            const url = await client.query("SELECT * FROM urlshema WHERE longurl='"+longUrl+"'");

            if(url.rows[0]){
                await ctx.render('dev', {
                    shortUrl: url.rows[0].shorturl
                });
            } else {
                const shortUrl = baseUrl + '/' +urlCode;
                await client.query("INSERT INTO urlshema (longurl, shorturl, urlcode) VALUES ('"+longUrl+"', '"+shortUrl+"', '"+urlCode+"' )");
                await ctx.render('dev', {
                    shortUrl: shortUrl
                });
            }

        } catch(err) {
            ctx.throw(400, err);
        }
    } else {
        ctx.throw(400, 'invalid longUrl');
    }
};


exports.redirectByCode = async(ctx) => {
    try {
        let ip = await publicIp.v4();
        let geo = geoip.lookup(ip);
        const url = await client.query("SELECT * FROM urlshema WHERE urlcode='"+ctx.params.code+"'");

        if(url.rows[0]){
            const baseUrl = 'http://localhost:3000';
            const shortUrl = baseUrl + '/' +ctx.params.code;

            const location = await client.query("SELECT * FROM location WHERE urlcode='"+shortUrl+"' AND country='"+geo.country+"'");
            if (location.rows[0]){
                let cnt = location.rows[0].cnt + 1;
                await client.query("UPDATE location SET cnt = '"+cnt+"' WHERE urlcode='"+shortUrl+"' AND country='"+geo.country+"'" );
            }  else {
                await client.query("INSERT INTO location (country, urlcode) VALUES ('"+geo.country+"', '"+shortUrl+"')");
            }

            return ctx.redirect(url.rows[0].longurl)
        } else {
            ctx.throw(400, 'code function wrong');
        }

    } catch (err) {
        ctx.throw(400, err);
    }
};


