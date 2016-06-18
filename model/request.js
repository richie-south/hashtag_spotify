"use strict";

const request = require('request');

/**
 * [openLinkAndGetFullUrl takes shorten url and returns full url]
 * @callback {[string]}            [full url]
 */
const openLinkAndGetFullUrl = (callback, url) => {
    request( { method: 'HEAD', url: url, followAllRedirects: true, timeout: 5000, maxRedirects:4 },
        function (error, response) {
            if (error) {
                console.log(error);
                return callback(null, new Error('no url'));
            }
            callback(response.request.href);
        });
};

/**
 * [getUrlTrackId checks if url strig contains "track/" word]
 * @return {[string]}     [spotify trackId]
 */
const getUrlTrackId = (url) => {
    let trackId;
    try {
        trackId = url.match('track\/(.[^\ |,|)|?|&]+)');
    } catch (e) {
        console.log(e);
    }
    return Array.isArray(trackId) ? trackId[1] : null;
};


const doRequest = (url) =>
    new Promise((resolve, reject) => {
        openLinkAndGetFullUrl((urlResponse, error) => {
            if(error){ return resolve(null); }
            resolve(getUrlTrackId(urlResponse));
        }, url);
    });


module.exports = {
    openLinkAndGetFullUrl,
    getUrlTrackId,
    doRequest
};
