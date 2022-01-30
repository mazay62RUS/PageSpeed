//const request = require('request');
const express = require('express');
const app = express();
const request = require('sync-request');

const db = require('./db/db')

db.pool.connect()

const sourceTagRequest = require('./sourceTagRequest/sourceTagRequest')

const PORT = 1337;

app.get('/sites', (req, res) => {
    const site = req.query.search;
    try {
        const responce = request('GET', `http://${site}`)
       // if ( db.getBenchmarkForOneDay(site, res) ) {
            console.log('lol')
            const body = responce.getBody('utf-8')
            const timestamp = new Date();
            const benchmark = sourceTagRequest.pageSpeed(body, site);
            console.log(`page speed of ${site}: ${benchmark} ms`)
            const url = site
            db.insertBenchmark(url, benchmark, timestamp)
            res.json({url, benchmark, timestamp})
       // }
    } catch {
        //console.log('error', responce.getBody('utf-8'))
        res.json("bad request")
    }
    
})

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})
