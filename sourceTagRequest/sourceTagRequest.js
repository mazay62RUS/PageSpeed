const request = require('sync-request');
const parseTag = require('./parseTagByKey')

/**
* @description Производим парсинг html кода страницы и замеряем скорость загрузки.
* @param   {string} html - передаем html код полученный по url
* @param   {string} site - url сайта
* @returns {number} скорость загрузки страницы, мс
*/
const pageSpeed = (html, site) => {

    const LinksTags = parseTag.parseTagByKey(html, site, 'link')
    const imgs = parseTag.parseTagByKey(html, site, 'img')
    const scriptsSrc = parseTag.parseTagByKey(html, site, 'script')
    const videoSrc = parseTag.parseTagByKey(html, site, 'video')

    let requestsStack = new Array();

    requestsStack = requestsStack.concat(LinksTags, imgs, scriptsSrc, videoSrc);

    let resultTime = 0;
    for ( let i = 0; i < requestsStack.length; i++ ) {
        let beforeLoad = Date.now();
        try {
            request('GET', requestsStack[i]);
            console.log(requestsStack[i], ' OK')
        } catch {
            console.log(requestsStack[i], ' Error')
        }
        let afterLoad = Date.now();
        resultTime += afterLoad - beforeLoad;
    }

    try {
        let beforeLoad = Date.now();
        request('GET', `http://${site}`);
        let afterLoad = Date.now();
        resultTime += afterLoad - beforeLoad
        console.log(`http://${site}`, ' OK')
    } catch {
        console.log(`http://${site}`, ' Error')
    }

    return resultTime

}

module.exports = { pageSpeed }