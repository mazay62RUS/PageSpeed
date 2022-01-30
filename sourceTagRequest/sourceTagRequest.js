const request = require('sync-request');
const cssLinks = require('./cssLinks')
const images = require('./images')
const scripts = require('./scripts') 
const videos = require('./video')

const pageSpeed = (html, site) => {

    const LinksTags = cssLinks.cssLinksParse(html, site)
    const imgs = images.imagesSrc(html, site);
    const scriptsSrc = scripts.parseScripts(html, site);
    const videoSrc = videos.videoSrc(html, site);

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