'use strict';

const keys = require('../config/config').keys;
const oa = require('oauth');
/**
 * [getUrlFromMessage gets url from string]
 * @param  {[type]} message [description]
 * @return {[string]}         [url]
 */

const getUrlFromStatuses = (message) => {
    let urlData;
    try {
        const regEx = new RegExp('https:\/\/t.co(.[^\ |\)|\,|(\\n)|(…)]+)');
        urlData = regEx.exec(message);
    } catch (e) {
        console.log('RegEx error twitter.js');
    }
    return Array.isArray(urlData) ? urlData[0] : null;
};

const getUrlsFromStatuses = (messages) =>
    messages
        .map(m => getUrlFromStatuses(m))
        .filter(u => u !== null);

/**
 * @return {[array]} [cleen text from messages]
 */
const getStatuses = (statuses) => statuses.map(i => i.text);

/**
 * [oauth against twitter]
 * @return {[object]}     [oauth key]
 */

const getOauth = () =>
    new oa.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        keys.twitter.consumerkey,
        keys.twitter.consumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

/**
 * [makes twitter api http request.]
 * @callback {[object]}            [response data from twitter]
 */
const makeSearchRequest = (count, ht) =>
    new Promise((resolve, reject) => {
        const oauth = getOauth();
        oauth.get(
            'https://api.twitter.com/1.1/search/tweets.json?q='+ht+'&result_type=recent&count='+count,
            keys.twitter.accessToken,
            keys.twitter.accessTokenSecret,
            function (e, data, res){
                if (e){
                    return reject(e);
                }
                resolve(JSON.parse(data));
            });
    });

module.exports = {
    getUrlFromStatuses,
    getUrlsFromStatuses,
    getStatuses,
    getOauth,
    makeSearchRequest
};
