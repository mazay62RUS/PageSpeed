const DomParser = require('dom-parser');
const parser = new DomParser();
const parseTagByKey = require('./parseTagByKey');

/**
* @description Находим все теги <link> и получаем значение из атрибута href
* @param   {string} html - передаем html код полученный по url
* @param   {string} site - url сайта
* @returns {Array}  возвращаем массив ссылок
*/
const cssLinksParse = (html, site) => {
    const dom = parser.parseFromString(html);
    const cssLinks = dom.getElementsByTagName('link');

    let cssLinksArrs = new Array();

    cssLinksArrs = parseTagByKey.parseTagByKey('href', cssLinks, site);

    return cssLinksArrs

}

module.exports = { cssLinksParse }