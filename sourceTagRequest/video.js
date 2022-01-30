const DomParser = require('dom-parser');
const parser = new DomParser();
const parseTagByKey = require('./parseTagByKey');

const videoSrc = (html, site) => {
    const dom = parser.parseFromString(html);
    const videos = dom.getElementsByTagName('video')

    let videosArrs = new Array();

    videosArrs = parseTagByKey.parseTagByKey('src', videos, site);

    return videosArrs

}


module.exports = { videoSrc }