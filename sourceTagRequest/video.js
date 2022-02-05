const DomParser = require('dom-parser');
const parser = new DomParser();
const parseTagByKey = require('./parseTagByKey');

/**
* @description Находим все теги <video> и получаем значение из атрибута src
* @param   {string} html - передаем html код полученный по url
* @param   {string} site - url сайта
* @returns {Array}  возвращаем массив ссылок
*/
const videoSrc = (html, site) => {
    const dom = parser.parseFromString(html);
    const videos = dom.getElementsByTagName('video')

    let videosArrs = new Array();

    videosArrs = parseTagByKey.parseTagByKey('src', videos, site);

    return videosArrs

}


module.exports = { videoSrc }