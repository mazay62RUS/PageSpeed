/**
* @description Производим вставку полученного бенчмарка в БД
* @param   {string} url - url адрес страницы
* @param   {number} benchmark - скорость загрузки страницы, мс
* @param {Date} timestamp - точная дата и время произведенного действия
* @returns {string} строк запроса
*/
const insertBenchmark = (url, benchmark, timestamp) => {
   return `INSERT INTO pagespeed (url, benchmark, timestamp)
                     VALUES ('${url}', '${benchmark}', '${timestamp}');`
}

/**
* @description получаем самый свежий бенчмарку из БД
* @param   {string} url - url адрес страницы
* @returns {string} строк запроса
*/
const getBenchmarks = (url) => {
    return `
        SELECT  *
        FROM    pagespeed
        WHERE 1=1
        AND url = '${url}'
        ORDER BY timestamp ASC
        LIMIT 1
        ;
    `
}

module.exports = { insertBenchmark, getBenchmarks}