const DomParser = require('dom-parser');
const parser = new DomParser();

/**
* @description преобразуем массив одноименных тегов в
* массив ссылок
* @param   {string} html - по каким атрибутам тега производим отбор
* @param   {string} site - url сайта
* @param   {string}  tag - тег участвующий в отборе
* @returns {Array}  возвращаем массив ссылок
*/
const parseTagByKey = (html, site, tag) => {

    const dom = parser.parseFromString(html);
    const tags = dom.getElementsByTagName(tag);

    let resultArr = new Array();

    for ( let i = 0; i < tags.length; i++ ) {
        for ( let j = 0; j < tags[i].attributes.length; j++ ) {
            if ( tags[i].attributes[j].name == findedKeyByTag(tag) ) {
                if ( 
                    tags[i].attributes[j].value.startsWith('http') ||
                    tags[i].attributes[j].value.startsWith('https') 
                ) {
                    resultArr.push(tags[i].attributes[j].value)
                  } else {
                    resultArr.push(`http://${site + tags[i].attributes[j].value}`)
                }
            }
        }
    }

    return resultArr;

}

/**
* @description ищем атрибут для загрузки контента у тега
* @param   {string}  tag - тег участвующий в отборе
* @returns {string}  загружаемый атрибут тега
*/
const findedKeyByTag = (tag) => {
    if ( tag == 'link' ) return 'href'
    if ( tag == 'script' ) return 'src'
    if ( tag == 'video' ) return 'src'
    if ( tag == 'img' ) return 'src'
}

module.exports = { parseTagByKey }