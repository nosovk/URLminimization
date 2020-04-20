import validUrl from 'valid-url';
import shortid from 'shortid';
import client from '../../models/db';
import geoip from 'geoip-lite';
import publicIp from 'public-ip';

export const main = async(ctx) => {
    //Gey unique elements from db
    const newLoc = await client.query("with maxcnt as (SELECT max(cnt) as cnt, urlcode  FROM location GROUP BY urlcode) select * from location natural join maxcnt order by cnt desc limit 5");
    console.log(ctx.request.user.email);
    ctx.body = {links: newLoc.rows, user:ctx.request.user.email};

};

export const createShortLink = async(ctx) => {
    const longUrl = ctx.request.body.OriginalName;
    const baseUrl = 'http://localhost:5000';
    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
        try {
            const url = await client.query("SELECT * FROM urlshema WHERE longurl= $1", [longUrl]);

            if(url.rows[0]){
                ctx.body = {shortUrl: url.rows[0].shorturl};
            } else {
                const shortUrl = baseUrl + '/' +urlCode;
                await client.query("INSERT INTO urlshema (longurl, shorturl, urlcode) VALUES ($1, $2, $3)", [longUrl, shortUrl, urlCode]);
                ctx.body = {shortUrl: shortUrl};
            }

        } catch(err) {
            ctx.throw(400, err);
        }
    } else {
        ctx.throw(400, 'invalid longUrl');
    }
};


export const redirectByCode = async(ctx) => {
    let ip = await publicIp.v4();
    let geo = geoip.lookup(ip);
    const url = await client.query("SELECT * FROM urlshema WHERE urlcode = $1", [ctx.params.code]);
    const baseUrl = 'http://localhost:5000';
    const shortUrl = baseUrl + '/' +ctx.params.code;
    try {
        if(url.rows[0]){
            const location = await client.query("SELECT * FROM location WHERE urlcode = $1 AND country = $2", [shortUrl, geo.country]);
            if (location.rows[0]){
                let cnt = location.rows[0].cnt + 1;
                await client.query("UPDATE location SET cnt = $1 WHERE urlcode = $2 AND country = $3", [cnt, shortUrl, geo.country]);
            }  else {
                await client.query("INSERT INTO location (country, urlcode) VALUES ($1, $2)", [geo.country, shortUrl]);
            }

            return ctx.redirect(url.rows[0].longurl)
        } else {
            ctx.throw(400, 'code function wrong');
        }

    } catch (err) {
        ctx.throw(400, err);
    }
};


