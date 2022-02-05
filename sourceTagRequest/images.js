const DomParser = require('dom-parser');
const parser = new DomParser();
const parseTagByKey = require('./parseTagByKey');

/**
* @description Находим все теги <img> и получаем значение из атрибута src
* @param   {string} html - передаем html код полученный по url
* @param   {string} site - url сайта
* @returns {Array}  возвращаем массив ссылок
*/
const imagesSrc = (html, site) => {
    const dom = parser.parseFromString(html);
    const imgs = dom.getElementsByTagName('img')

    let imgsArrs = new Array();

    imgsArrs = parseTagByKey.parseTagByKey('src', imgs, site);

    return imgsArrs

}


module.exports = { imagesSrc }