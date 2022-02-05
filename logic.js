const request = require('sync-request');
const { Client } = require('pg');
const AuthDbData = require('./db/db_connect.json');

const client = new Client(AuthDbData);

const sourceTagRequest = require('./sourceTagRequest/sourceTagRequest')
const db = require('./db/db');

client.connect()

const main = (site, responceJson) => {
    checkResultForOneDay(site, db.getBenchmarks(site), responceJson)
}

const checkResultForOneDay = async (site, query, responceJson) => {

    try {
        const data = await client.query(query);
        const hour = (new Date() - new Date(data.rows[0].timestamp)) / (60 * 60 * 1000);
        console.log(hour)
        if ( hour > 24 ) {
            console.log('do request')
            getBenchmarkByUrl(site, responceJson);
        } else {
            console.log('get last data')
            const obj = {
                'url': data.rows[0].url,
                'benchmark': data.rows[0].benchmark,
                'timestamp': data.rows[0].timestamp
            }
            console.log(obj)
            responceJson.json(obj)
        }

    } catch (err) {
        console.log(err.stack);
        responceJson.json('Bad request 400')
    }

}

const getBenchmarkByUrl = async (url, responceJson) => {
    const responce = request('GET', `http://${url}`)
    const body = responce.getBody('utf-8')
    const timestamp = new Date();
    const benchmark = sourceTagRequest.pageSpeed(body, url);
    try {
        const data = await client.query(db.insertBenchmark(url, benchmark, timestamp))
        console.log(data)
        const obj = {
            'url': url,
            'benchmark': benchmark,
            'timestamp': timestamp
        }
        console.log(obj)
        responceJson.json(obj)
    } catch (err) {
        console.log(err.stack);
        responceJson.json('Bad request 400')
    }

}

module.exports = { main }