const keys = require('../config/config').keys
const oa = require('oauth')

/**
 * @param {[array]} statuses [array of twitter data]
 * @return {[array]} [urls]
 */
const getUrls = (statuses) => 
  statuses.map(status => status.entities.urls)
  .reduce((a, b) => a.concat(b))
  .map(({expanded_url}) => expanded_url)

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
  )

/**
 * [makes twitter api http request.]
 * @callback {[object]}            [response data from twitter]
 */
const makeSearchRequest = (count, ht) =>
  new Promise((resolve, reject) => {
    const oauth = getOauth()
    oauth.get(
      'https://api.twitter.com/1.1/search/tweets.json?q='+ht+'&result_type=recent&count='+count,
      keys.twitter.accessToken,
      keys.twitter.accessTokenSecret,
      function (e, data){
        if (e){
          return reject(e)
        }
        resolve(JSON.parse(data))
      })
  })

module.exports = {
  getUrls,
  getOauth,
  makeSearchRequest,
}
