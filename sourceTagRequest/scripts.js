const DomParser = require('dom-parser');
const parser = new DomParser();
const parseTagByKey = require('./parseTagByKey');

const parseScripts = (html, site) => {
    const dom = parser.parseFromString(html);
    const scripts = dom.getElementsByTagName('script')

    let scriptsArrs = new Array();

    scriptsArrs = parseTagByKey.parseTagByKey('src', scripts, site);

    return scriptsArrs;

}

module.exports = { parseScripts }