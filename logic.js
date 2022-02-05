const request = require('sync-request');
const { Client } = require('pg');
const AuthDbData = require('./db/db_connect.json');

const client = new Client(AuthDbData);

const sourceTagRequest = require('./sourceTagRequest/sourceTagRequest')
const db = require('./db/db');

client.connect()

/**
* @description просто главная функция)
* @param   {string} site - url сайта
* @param   {string} responceJson - ссылка на responce
*/
const main = (site, responceJson) => {
    checkResultForOneDay(site, db.getBenchmarks(site), responceJson)
}

/**
* @description Получаем последний бенчмарк по полученному url.
* Если последний бенчмарк сделан больше 24 часов назад, то выполняем getBenchmarkByUrl(),
* Иначе отправляем полученный результат из БД
* @param {string} site - url адрес
* @param {string} query - строка с SQL запросом
* @param {string} responceJson - ссылка на responce
*/
const checkResultForOneDay = async (site, query, responceJson) => {

    try {
        const data = await client.query(query);
        const hour = (new Date() - new Date(data.rows[0].timestamp)) / (60 * 60 * 1000);
        console.log(data)
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

/**
* @description Производим скорость загрузки страницы и добавляем результат в БД 
* @param {string} url - url адрес
* @param {string} responceJson - ссылка на responce
*/
const getBenchmarkByUrl = async (url, responceJson) => {
    try {
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

    } catch (err) {
        console.log('error', err)
        responceJson.json('bad request')
    }


}

module.exports = { main }