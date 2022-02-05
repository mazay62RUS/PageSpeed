const DomParser = require('dom-parser');
const parser = new DomParser();
const parseTagByKey = require('./parseTagByKey');

/**
* @description Находим все теги <script> и получаем значение из атрибута src
* @param   {string} html - передаем html код полученный по url
* @param   {string} site - url сайта
* @returns {Array}  возвращаем массив ссылок
*/
const parseScripts = (html, site) => {
    const dom = parser.parseFromString(html);
    const scripts = dom.getElementsByTagName('script')

    let scriptsArrs = new Array();

    scriptsArrs = parseTagByKey.parseTagByKey('src', scripts, site);

    return scriptsArrs;

}

module.exports = { parseScripts }