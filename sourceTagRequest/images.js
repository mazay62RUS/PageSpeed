const DomParser = require('dom-parser');
const parser = new DomParser();
const parseTagByKey = require('./parseTagByKey');

const imagesSrc = (html, site) => {
    const dom = parser.parseFromString(html);
    const imgs = dom.getElementsByTagName('img')

    let imgsArrs = new Array();

    imgsArrs = parseTagByKey.parseTagByKey('src', imgs, site);

    return imgsArrs

}


module.exports = { imagesSrc }