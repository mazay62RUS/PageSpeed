const DomParser = require('dom-parser');
const parser = new DomParser();
const parseTagByKey = require('./parseTagByKey');

const cssLinksParse = (html, site) => {
    const dom = parser.parseFromString(html);
    const cssLinks = dom.getElementsByTagName('link');

    let cssLinksArrs = new Array();

    cssLinksArrs = parseTagByKey.parseTagByKey('href', cssLinks, site);

    return cssLinksArrs

}

module.exports = { cssLinksParse }